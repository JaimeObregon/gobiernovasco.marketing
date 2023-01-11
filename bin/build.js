#!/usr/bin/env node

import { build } from 'esbuild'

const buildOptions = {
  entryPoints: ['httpdocs/app.js', 'httpdocs/app.css'],
  bundle: true,
  minify: true,
  splitting: true,
  legalComments: 'none',
  outdir: 'httpdocs/build',
  format: 'esm',
  external: ['/fonts/*'],
}

build(buildOptions).catch(() => process.exit(1))
