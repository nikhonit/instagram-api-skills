#!/usr/bin/env node
'use strict';

/**
 * Instagram (Instadata): search
 *
 *   --section=keyword-search -> /v1/instagram/keyword-search — 1 credit per result, paginated
 *   --section=reels-search -> /v1/instagram/reels-search — 1 credit per result, paginated
 */

const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');

const SECTIONS = {
  "keyword-search": {
    "path": "/v1/instagram/keyword-search",
    "input": "query"
  },
  "reels-search": {
    "path": "/v1/instagram/reels-search",
    "input": "query"
  }
};

const { _, flags } = parseFlags(process.argv.slice(2));
const section = flags.section ;
if (!section || !SECTIONS[section]) {
  usage("Usage: node search.js <input> --section=<keyword-search|reels-search>");
}
const target = SECTIONS[section];
const value = _[0] || flags.url || flags.handle || flags.query;
if (!value) usage('Missing input. Expected <' + target.input + '>.');
const params = { ...commonParams(flags), [target.input]: value };

main(() => callEndpoint(target.path, params));
