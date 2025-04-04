#! /bin/bash

export COMPANY="${COMPANY:-Neosofia, LLC}"
export DISCLAIMER="${DISCLAIMER:-This document is for internal use only.}"
export WATERMARK="${WATERMARK:-Official Copy}"
export SCCS_BASE_URL="${SCCS_BASE_URL:-https://github.com/Neosofia/corporate/commit/}"

if [ -z "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

DIRECTORY="$1"

for md_file in "$DIRECTORY"/*.md; do
    if [ -f "$md_file" ]; then
        pdf_file="${md_file%.md}.pdf"
        document_id=$(basename "$md_file" | cut -d'-' -f1-2)
        title=$(basename "$md_file" | cut -d'-' -f3- | sed -E 's/([A-Z])/\ \1/g; s/and/ and/g; s/\.md$//; s/^\s+|\s+$//g')

        echo "Processing title: $title, subtitle: $document_id"

        combined_content=$(cat "$md_file")

        # Generate the changelog
        change_log="## Changelog\n"
        change_log+="|Version|Date|Author|Message|\n"
        change_log+="|--|---|----|------|\n"
        change_log+="$(git log --merges -m --follow --pretty=tformat:"|%(describe:tags,abbrev=0) [%h]($SCCS_BASE_URL%h)|%as|<%ae>|%s|" "$md_file")"

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

            combined_content+="\n\n$signature_log" 
        else
            echo "No merge commits found for $md_file so electronic signatures are not generated."
        fi

        combined_content+="\n\n$change_log" 

        # Had to downgrade to markdown_github to make pipe tables work as they should.
        # TBD: go back to gfm or commonmark_x when pipe tables are fixed.

        # TBD: use git tags to generate a friendly document version number
        # for now we just use YYYY.MM.DD but I know some auditors will have issue with that style.

        recent_tag=$(git describe --tags --abbrev=0)
        echo "Recent Tag: $recent_tag"

        echo -e "$combined_content" | pandoc -o "$pdf_file" -f markdown_github \
            --number-sections \
            --pdf-engine=xelatex \
            --include-in-header="$(dirname "$0")/header-template.latex" \
            --metadata-file="$(dirname "$0")/metadata.yaml" \
            -V title="$title ($recent_tag)" \
            -V subtitle="$document_id" \
            -V author="$COMPANY" \
            -V linkcolor="brand-color" \
            -V filecolor="black" \
            -V urlcolor="brand-color"
    fi
done
