#!/usr/bin/env bash

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

if [ -n "$SCCS_BASE_URL" ]; then
    SCCS_BASE_URL="${SCCS_BASE_URL%/}/"
    case "$SCCS_BASE_URL" in
        */commit/) ;;
        */commit/*) ;;
        *) SCCS_BASE_URL="${SCCS_BASE_URL}commit/" ;;
    esac
fi

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

function utc_date_from_epoch() {
    local epoch="$1"
    if date -u -r "$epoch" +"%Y-%m-%d %H:%M:%S" >/dev/null 2>&1; then
        date -u -r "$epoch" +"%Y-%m-%d %H:%M:%S"
    elif date -u -d "@${epoch}" +"%Y-%m-%d %H:%M:%S" >/dev/null 2>&1; then
        date -u -d "@${epoch}" +"%Y-%m-%d %H:%M:%S"
    else
        echo "$epoch"
    fi
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
    changelog+="$(git log --first-parent --merges -m \
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

    # Generate the signature log.
    #
    # We want two rows for each merge commit affecting this file:
    #   1) Author Change  — the actual branch commit that changed the file content
    #   2) Approval       — the merge commit author/timestamp for the PR merge
    #
    # We use first-parent merge history to follow the mainline changelog order,
    # then locate the earliest non-merge commit on that merge's ancestry path for
    # the file change itself.
    #
    # If we cannot find a distinct change commit, fall back to the merge commit.
    merge_history=$(git log --first-parent --merges -m --pretty=format:"%h" -- "$md_file")

    if [ -n "$merge_history" ]; then
        signature_log="## Electronic Signatures\n"
        signature_log+="|Time (UTC)|Signature ID|Actor|Reason|\n"
        signature_log+="|----|-----|---|---|"

        for merge_commit in $merge_history; do
            change_commit=$(git log --pretty=format:'%h' --no-merges "${merge_commit}^2" -- "$md_file" | head -n 1)
            if [ -z "$change_commit" ]; then
                change_commit="$merge_commit"
            fi

            local author_date
            author_date="\`$(utc_date_from_epoch "$(git show -s --format=%at "$change_commit")")\`"
            local approval_date
            approval_date="\`$(utc_date_from_epoch "$(git show -s --format=%ct "$merge_commit")")\`"

            local tag_name
            tag_name=$(git tag --points-at "$merge_commit" | sort | head -n 1)
            if [ -z "$tag_name" ]; then
                tag_name="UNKNOWN"
            fi

            local author_line
            author_line=$(git show --no-patch --format="|%GK %GS|%an|Author ${tag_name}|" "$change_commit")
            local approval_line
            approval_line=$(git show --no-patch --format="|%GK %GS|%an|Approval ${tag_name}|" "$merge_commit")

            signature_log+="\n|${approval_date}${approval_line}"
            signature_log+="\n|${author_date}${author_line}"
        done

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

    # Before we generate a document, generate a local set of tags based on the
    # merge history of the file being passed in.
    #
    # Use annotated tags so the tag is self-describing and Git does not prompt for
    # a comment editor when tag signing is enabled.
    local existing_tags
    existing_tags=$(git tag)
    if [ -n "$existing_tags" ]; then
        git tag -d $existing_tags
    fi

    git log --reverse --merges -m --date=short --pretty=format:"git tag -a VXXX -m 'Automated version tag for %f on %ad (%h)' %h ;" "$md_file" |
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
