#!/usr/bin/env node
'use strict';

/**
 * Instagram (Instadata): channel
 *
 *   --section=stats -> /v1/instagram/channel-stats — 1 credit per profile
 *   --section=posts -> /v1/instagram/channel-posts — 1 credit per post, paginated
 *   --section=reels -> /v1/instagram/channel-reels — 1 credit per reel, paginated
 */

const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');

const SECTIONS = {
  "stats": {
    "path": "/v1/instagram/channel-stats",
    "input": "handle"
  },
  "posts": {
    "path": "/v1/instagram/channel-posts",
    "input": "handle"
  },
  "reels": {
    "path": "/v1/instagram/channel-reels",
    "input": "handle"
  }
};

const { _, flags } = parseFlags(process.argv.slice(2));
const section = flags.section ;
if (!section || !SECTIONS[section]) {
  usage("Usage: node get_channel.js <input> --section=<stats|posts|reels>");
}
const target = SECTIONS[section];
const value = _[0] || flags.url || flags.handle || flags.query;
if (!value) usage('Missing input. Expected <' + target.input + '>.');
const params = { ...commonParams(flags), [target.input]: value };

main(() => callEndpoint(target.path, params));
