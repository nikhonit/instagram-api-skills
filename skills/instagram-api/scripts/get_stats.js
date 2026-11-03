#!/usr/bin/env node
'use strict';

/**
 * Instagram (Instadata): stats
 *
 *   /v1/instagram/stats — 1 credit per post
 */

const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');

const SECTIONS = {
  "default": {
    "path": "/v1/instagram/stats",
    "input": "url"
  }
};

const { _, flags } = parseFlags(process.argv.slice(2));
const section = flags.section || 'default';
if (!section || !SECTIONS[section]) {
  usage("Usage: node get_stats.js <input>");
}
const target = SECTIONS[section];
const value = _[0] || flags.url || flags.handle || flags.query;
if (!value) usage('Missing input. Expected <' + target.input + '>.');
const params = { ...commonParams(flags), [target.input]: value };

main(() => callEndpoint(target.path, params));
