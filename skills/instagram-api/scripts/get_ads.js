#!/usr/bin/env node
'use strict';

/**
 * Instagram (Instadata): ads
 *
 *   --section=search -> /v1/instagram/ads-search — 3 credits per ad, paginated
 *   --section=by-page -> /v1/instagram/ads-by-page — 3 credits per ad, paginated
 */

const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');

const SECTIONS = {
  "search": {
    "path": "/v1/instagram/ads-search",
    "input": "query"
  },
  "by-page": {
    "path": "/v1/instagram/ads-by-page",
    "input": "query"
  }
};

const { _, flags } = parseFlags(process.argv.slice(2));
const section = flags.section ;
if (!section || !SECTIONS[section]) {
  usage("Usage: node get_ads.js <input> --section=<search|by-page>");
}
const target = SECTIONS[section];
const value = _[0] || flags.url || flags.handle || flags.query;
if (!value) usage('Missing input. Expected <' + target.input + '>.');
const params = { ...commonParams(flags), [target.input]: value };

main(() => callEndpoint(target.path, params));
