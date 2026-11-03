#!/usr/bin/env node
'use strict';

/**
 * Instagram (Instadata): profile
 *
 *   --section=full -> /v1/instagram/profile-full — 1 credit per profile
 *   --section=about -> /v1/instagram/profile-about — 4 credits per profile
 *   --section=search -> /v1/instagram/profile-search — 1 credit per profile, paginated
 *   --section=similar -> /v1/instagram/similar — 1 credit per profile
 *   --section=tagged -> /v1/instagram/tagged — 1 credit per post, paginated
 *   --section=mentions -> /v1/instagram/mentions — 1 credit per post, paginated
 *   --section=comments -> /v1/instagram/profile-comments — 1 credit per comment, paginated
 *   --section=collaborations -> /v1/instagram/collaborations — 3 credits per collaboration, paginated
 */

const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');

const SECTIONS = {
  "full": {
    "path": "/v1/instagram/profile-full",
    "input": "handle"
  },
  "about": {
    "path": "/v1/instagram/profile-about",
    "input": "handle"
  },
  "search": {
    "path": "/v1/instagram/profile-search",
    "input": "query"
  },
  "similar": {
    "path": "/v1/instagram/similar",
    "input": "handle"
  },
  "tagged": {
    "path": "/v1/instagram/tagged",
    "input": "handle"
  },
  "mentions": {
    "path": "/v1/instagram/mentions",
    "input": "handle"
  },
  "comments": {
    "path": "/v1/instagram/profile-comments",
    "input": "handle"
  },
  "collaborations": {
    "path": "/v1/instagram/collaborations",
    "input": "handle"
  }
};

const { _, flags } = parseFlags(process.argv.slice(2));
const section = flags.section ;
if (!section || !SECTIONS[section]) {
  usage("Usage: node get_profile.js <input> --section=<full|about|search|similar|tagged|mentions|comments|collaborations>");
}
const target = SECTIONS[section];
const value = _[0] || flags.url || flags.handle || flags.query;
if (!value) usage('Missing input. Expected <' + target.input + '>.');
const params = { ...commonParams(flags), [target.input]: value };

main(() => callEndpoint(target.path, params));
