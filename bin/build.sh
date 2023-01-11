#!/bin/bash

yarn install || exit 1
bin/build.js || exit 2
sed -i '' -E "s/\/(app\.(css|js))/\/build\/\1/" httpdocs/index.html
