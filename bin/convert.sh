#!/bin/bash

for file in httpdocs/reports/*.pdf; do
  pdftohtml -noframes -i -p -hidden -enc UTF-8 $file
done

mv httpdocs/reports/*html converted
