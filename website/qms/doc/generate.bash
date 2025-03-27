#! /bin/bash

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

        pandoc -o "$pdf_file" "$md_file" -f gfm \
            --pdf-engine=xelatex \
            --include-in-header=header-template.latex \
            --variable=title:"$title" \
            --variable=subtitle:"$document_id" \
            --variable=author:"Neosofia, LLC" \
            --metadata-file=metadata.yaml \
            --metadata=docid="$document_id"
    fi
done
