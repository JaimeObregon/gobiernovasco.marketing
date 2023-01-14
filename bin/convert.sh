#!/bin/bash

for file in pdf/*.pdf; do
  pdftohtml -noframes -i -p -hidden -enc UTF-8 $file
done

mv pdf/*html converted
