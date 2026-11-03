#!/usr/bin/env node
'use strict';

/**
 * Instagram (Instadata): transcript
 *
 *   --section=default -> /v1/instagram/transcript — 1 credit + 20 per started minute
 *   --section=summary -> /v1/instagram/summary — 4 credit + 20 per started minute
 */

const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');

const SECTIONS = {
  "default": {
    "path": "/v1/instagram/transcript",
    "input": "url"
  },
  "summary": {
    "path": "/v1/instagram/summary",
    "input": "url"
  }
};

const { _, flags } = parseFlags(process.argv.slice(2));
const section = flags.section || 'default';
if (!section || !SECTIONS[section]) {
  usage("Usage: node get_transcript.js <input> --section=<default|summary>");
}
const target = SECTIONS[section];
const value = _[0] || flags.url || flags.handle || flags.query;
if (!value) usage('Missing input. Expected <' + target.input + '>.');
const params = { ...commonParams(flags), [target.input]: value };

main(() => callEndpoint(target.path, params));
