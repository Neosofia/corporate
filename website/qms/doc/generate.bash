#! /bin/bash

export COMPANY="${COMPANY:-Neosofia, LLC}"
export DISCLAIMER="${DISCLAIMER:-This document is for internal use only.}"
export WATERMARK="${WATERMARK:-Official Copy}"


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

        git_log="## Changelog\n"
        git_log+="|Commit|Date|Author|Message|\n"
        git_log+="|--|---|----|------|\n"
        git_log+="$(git log --pretty=tformat:"|%h|%as|<%ae>|%s|" "$md_file")"
   
        combined_content=$(cat "$md_file")
        combined_content+="\n\n$git_log" 

        # Had to downgrade to markdown_github to make pipe tables work as they should.
        # TBD: go back to gfm or commonmark_x when pipe tables are fixed.
        echo -e "$combined_content" | pandoc -o "$pdf_file" -f markdown_github \
            --number-sections \
            --pdf-engine=xelatex \
            --include-in-header="$(dirname "$0")/header-template.latex" \
            --metadata-file="$(dirname "$0")/metadata.yaml" \
            -V title="$title" \
            -V subtitle="$document_id" \
            -V author="$COMPANY" \
            -V linkcolor="brand-color" \
            -V filecolor="black" \
            -V urlcolor="black"
    fi
done
