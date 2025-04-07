#! /bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

set -a
source "$(dirname "$0")/.env"
set +a

export COMPANY="${COMPANY:-ACME CORPORATION}"
export DISCLAIMER="${DISCLAIMER:-This document is for internal use only.}"
export WATERMARK="${WATERMARK:-Official Copy}"
export WEBSITE_BASE_DIR="${WEBSITE_BASE_DIR:-/}"

DIRECTORY="$1"

# Rectorial Question: Why is 0 true and 1 false in bash? 🤦‍♂️
function check_git() {
    if ! command -v git &>/dev/null; then
        echo "Git command not found. WARN: Skipping advanced features."
        return 1
    fi

    if [ -z "$(git rev-parse --is-inside-work-tree 2>/dev/null)" ]; then
        echo "Not inside a Git repository. WARN: Skipping advanced features."
        return 1
    fi

    return 0
}

# if we don't have git, we can't generate a changelog and return an empty string
function generate_changelog() {
    if ! check_git; then
        return
    fi

    local md_file="$1"
    local changelog="## Changelog\n"
    changelog+="|Version|Date|Author|Message|\n"
    changelog+="|--|---|----|------|\n"
    changelog+="$(git log --merges -m --follow --pretty=tformat:"|%(describe:tags,abbrev=0) [%h]($SCCS_BASE_URL%h)|%as|%an|%s|" "$md_file")"

    echo -e "$changelog"
}

# if we don't have git, we can't generate a signature log and return an empty string    
function generate_signature_log() {
    if ! check_git; then
        return
    fi

    local md_file="$1"

    # Generate the signature log
    #
    # TBD: consider allowing users to configure inclusion of a full electronic signature log.
    #
    # We only include the most recent set of changes between the two most recent merge commits.
    # Squash and rebase commits are too lossy to generate a signature log and can be manipulated
    # to show false information. I don't think they'll ever be supported, but never say never.
    merge_history=$(git log --follow --merges -m --pretty=format:"%h" "$md_file")
    most_recent_merge_commit=$(echo "$merge_history" | sed -n '1p')
    second_most_recent_merge_commit=$(echo "$merge_history" | sed -n '2p')

    if [ -n "$most_recent_merge_commit" ]; then
        signature_log="## Electronic Signatures\n"
        signature_log+="|Date|Signature ID/Owner|Actor|Reason|\n"
        signature_log+="|---|------|---|---|"

        commit_range="${second_most_recent_merge_commit}..${most_recent_merge_commit}"
        signature_log+="\n$(git log --pretty=tformat:"|%ai|%GK %GS|%an|Author Change %h|" $commit_range "$md_file")"

        signature_log+="\n$(git show --pretty=tformat:"|%ai|%GK %GS|%an|Approval|" $most_recent_merge_commit)"

        # TBD: Add the ability to capture a reviewer based on the reviews done on GitHub/GitLab.
        # I don't like the idea of reviewers making meta commits to indicate reviews in git
        # but the idea of being tied to a specific vendor's APIs and review system is also
        # not appealing. Noodle the reviewer design before reviewing this code.

        echo -e "$signature_log"
    else
        echo "No merge commits found for $md_file so electronic signatures are not generated."
    fi
}

find "$DIRECTORY" -type f -name "*.md" | while read -r md_file; do
    pdf_file="${md_file%.md}.pdf"
    document_id=$(basename "$md_file" | cut -d'-' -f1-2)
    title=$(basename "$md_file" | cut -d'-' -f3- | sed -E 's/([A-Z])/\ \1/g; s/and/ and/g; s/\.md$//; s/^\s+|\s+$//g')

    echo "Processing title: $title, subtitle: $document_id"

    # TBD: we assume that all mds are being converted to pdfs
    combined_content=$(cat "$md_file" |
        sed "s|]:[[:space:]]*$WEBSITE_BASE_DIR|]:$WEBSITE_BASE_URL|g; s|\.md|\.pdf|g")

    change_log=$(generate_changelog "$md_file")
    combined_content+="\n\n$change_log"

    signature_log=$(generate_signature_log "$md_file")
    combined_content+="\n\n$signature_log"

    # TBD: add auto incrementing git tag version number here
    # The template will use YYYY.MM.DD for the version number if we don't have git tags
    recent_tag=$(git describe --abbrev=0 --tags $(git log -m --merges --pretty=%H -1 "$md_file"))
    export VERSION="$recent_tag"

    # Had to downgrade to markdown_github to make pipe tables work as they should.
    # TBD: go back to gfm or commonmark_x when pipe tables are fixed.
    echo -e "$combined_content" | pandoc -o "$pdf_file" -f markdown_github \
        --number-sections --quiet \
        --pdf-engine=xelatex \
        --include-in-header="$(dirname "$0")/header-template.latex" \
        --metadata-file="$(dirname "$0")/metadata.yaml" \
        -V title="$title ($recent_tag)" \
        -V subtitle="$document_id" \
        -V author="$COMPANY" \
        -V linkcolor="brand-color" \
        -V filecolor="black" \
        -V urlcolor="brand-color"
done
