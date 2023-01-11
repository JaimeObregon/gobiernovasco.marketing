#!/bin/bash

for file in pdf/*.pdf; do
  pdftohtml -noframes -c -i -p -hidden -enc UTF-8 $file
done

mv pdf/*html converted
