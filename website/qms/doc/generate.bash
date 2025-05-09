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

# Rhetorical Question: Why is 0 true and 1 false in bash? 🤦‍♂️
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

function generate_changelog() {
    # if we don't have git, we can't generate a changelog so return an empty string
    if ! check_git; then
        return
    fi

    local md_file="$1"
    local changelog="## Changelog\n"
    changelog+="|Version|Date|Author|Message|\n"
    changelog+="|---|---|---|---------|\n"
    changelog+="$(git log --merges -m \
        --pretty=tformat:"|[%(describe:tags,abbrev=0)]($SCCS_BASE_URL%h)|%as|%an|%s|" \
        "$md_file")"

    echo -e "$changelog"
}

function generate_signature_log() {
    # if we don't have git, we can't generate a signature log so return an empty string
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

        signature_log+="\n$(git log \
            --pretty=tformat:"|%ai|%GK %GS|%an|Author Change [%h]($SCCS_BASE_URL%h)|" \
            $commit_range "$md_file")"

        signature_log+="\n$(git show \
            --pretty=tformat:"|%ai|%GK %GS|%an|Approval|" \
            $most_recent_merge_commit)"

        # TBD: Add the ability to capture a reviewer based on the reviews done on GitHub/GitLab.
        # I don't like the idea of reviewers making meta commits to indicate reviews in git
        # but the idea of being tied to a specific vendor's APIs and review system is also
        # not appealing. Noodle the reviewer design before reviewing this code.

        echo -e "$signature_log"
    else
        echo "No merge commits found for $md_file so electronic signatures are not generated."
    fi
}

function generate_version_tags() {
    # if we don't have git, we can't generate version tags so return an empty string
    if ! check_git; then
        return
    fi
    local md_file="$1"

    # Before we generate a document, generate a local set of tags that are based on the 
    # merge history of the file being passed in
    #
    # TBD: in the future we should consider remote tags and conditionally use them if they exist.
    git tag -d $(git tag)

    git log --reverse --merges -m --pretty=format:"git tag VXXX %h ;" "$md_file" |
        nl -w3 -n rz | awk '{sub(/XXX/,$1); $1=""; print}' | tr -d '\n' | bash

    recent_tag=$(git describe --abbrev=0 --tags $(git log -m --merges --pretty=%H -1 "$md_file"))
    export VERSION="$recent_tag"

    # TBD: we assume that all mds are being converted to pdfs
    combined_content=$(cat "$md_file" |
        sed "s|]:[[:space:]]*$WEBSITE_BASE_DIR|]:$WEBSITE_BASE_URL|g; s|\.md|\.pdf|g")
}

find "$DIRECTORY" -type f -name "*.md" | while read -r md_file; do
    pdf_file="${md_file%.md}.pdf"

    TITLE=$(grep -m 1 '^# ' "$md_file" | sed 's/^# //')
    SUBTITLE=$(basename "$md_file" .md)

    echo "Processing title: $TITLE, subtitle: $SUBTITLE"

    ### VERSIONS ###
    generate_version_tags "$md_file"

    ### CHANGELOG ##
    change_log=$(generate_changelog "$md_file")
    combined_content+="\n\n$change_log"

    ### ELECTRONIC SIGNATURES ###
    signature_log=$(generate_signature_log "$md_file")
    combined_content+="\n\n$signature_log"

    # Had to downgrade to markdown_github to make pipe tables work as they should.
    # TBD: go back to gfm or commonmark_x when pipe tables are fixed.
    echo -e "$combined_content" | pandoc -o "$pdf_file" -f markdown_github \
        --number-sections --quiet --toc \
        --pdf-engine=xelatex \
        --include-in-header="$(dirname "$0")/header-template.latex" \
        -V title="$TITLE" \
        -V subtitle="$SUBTITLE" \
        -V author="$COMPANY" \
        -V linkcolor="url-color" \
        -V filecolor="black" \
        -V urlcolor="url-color" \
        -V documentclass="report" \
        -V geometry:"margin=1in" \
        -V mainfont="Inter" \
        -V fontsize="11pt"
done
