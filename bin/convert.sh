#!/bin/bash

for file in httpdocs/documentos/memorias/*.pdf; do
  pdftohtml -noframes -i -p -hidden -enc UTF-8 $file
done

mv httpdocs/documentos/memorias/*html converted
