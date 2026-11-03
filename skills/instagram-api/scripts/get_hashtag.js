#!/usr/bin/env node
'use strict';

/**
 * Instagram (Instadata): hashtag
 *
 *   --section=posts -> /v1/instagram/hashtag-posts — 1 credit per post, paginated
 *   --section=reels -> /v1/instagram/hashtag-reels — 1 credit per reel, paginated
 *   --section=stats -> /v1/instagram/hashtag-stats — 1 credit per hashtag
 *   --section=analytics -> /v1/instagram/hashtag-analytics — 4 credits per hashtag
 *   --section=search -> /v1/instagram/hashtag-search — 1 credit per hashtag, paginated
 */

const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');

const SECTIONS = {
  "posts": {
    "path": "/v1/instagram/hashtag-posts",
    "input": "query"
  },
  "reels": {
    "path": "/v1/instagram/hashtag-reels",
    "input": "query"
  },
  "stats": {
    "path": "/v1/instagram/hashtag-stats",
    "input": "query"
  },
  "analytics": {
    "path": "/v1/instagram/hashtag-analytics",
    "input": "query"
  },
  "search": {
    "path": "/v1/instagram/hashtag-search",
    "input": "query"
  }
};

const { _, flags } = parseFlags(process.argv.slice(2));
const section = flags.section ;
if (!section || !SECTIONS[section]) {
  usage("Usage: node get_hashtag.js <input> --section=<posts|reels|stats|analytics|search>");
}
const target = SECTIONS[section];
const value = _[0] || flags.url || flags.handle || flags.query;
if (!value) usage('Missing input. Expected <' + target.input + '>.');
const params = { ...commonParams(flags), [target.input]: value };

main(() => callEndpoint(target.path, params));
