#!/usr/bin/env node
'use strict';

/**
 * Instagram (Instadata): location
 *
 *   --section=search -> /v1/instagram/location-search — 1 credit per place, paginated
 *   --section=stats -> /v1/instagram/location-stats — 1 credit per place
 *   --section=posts -> /v1/instagram/location-posts — 1 credit per post, paginated
 */

const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');

const SECTIONS = {
  "search": {
    "path": "/v1/instagram/location-search",
    "input": "query"
  },
  "stats": {
    "path": "/v1/instagram/location-stats",
    "input": "query"
  },
  "posts": {
    "path": "/v1/instagram/location-posts",
    "input": "query"
  }
};

const { _, flags } = parseFlags(process.argv.slice(2));
const section = flags.section ;
if (!section || !SECTIONS[section]) {
  usage("Usage: node get_location.js <input> --section=<search|stats|posts>");
}
const target = SECTIONS[section];
const value = _[0] || flags.url || flags.handle || flags.query;
if (!value) usage('Missing input. Expected <' + target.input + '>.');
const params = { ...commonParams(flags), [target.input]: value };

main(() => callEndpoint(target.path, params));
