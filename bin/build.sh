#!/bin/bash

yarn install || exit 1
bin/build.js || exit 2

# Esta es la semántica de sed para el entorno Linux de Netlify.
# La semántica de sed en macOS es diferente.
sed -E "s/\/(app\.(css|js))/\/build\/\1/" -i httpdocs/index.html
