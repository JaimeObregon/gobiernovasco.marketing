#!/bin/bash
for file in pdf/*pdf; do
  pdftohtml -noframes -c -i -hidden $file || error 1
done

mv pdf/*html converted
