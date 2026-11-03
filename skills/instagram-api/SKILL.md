---
name: instagram-api
version: 1.0.0
description: Instagram data via Instadata — profiles, posts, reels, comments, hashtags, places, mentions, brand collaborations, Meta Ad Library ads, reel transcripts and summaries as clean JSON. Read-only.
license: MIT-0
author: Instadata
homepage: https://instadata.dev
repository: https://github.com/nikhonit/instagram-api-skills
tags:
  - instagram
  - reels
  - transcript
  - hashtags
  - social-media
  - api
  - mcp
allowed-tools: Bash(node:*)
metadata:
  openclaw:
    primaryEnv: INSTADATA_KEY
    homepage: https://instadata.dev
    requires:
      env:
        - INSTADATA_KEY
    network:
      allow:
        - api.instadata.dev
    shell:
      only: scripts/*.js
---

# Instagram API (Instadata)

Public Instagram data as JSON from [Instadata](https://instadata.dev): 28 endpoints behind one bearer key. Read-only.

## Setup

```bash
export INSTADATA_KEY=ik_live_...   # https://instadata.dev/app/keys
```

Signup includes 25 free credits, no card (free keys return up to 5 items per list call). Paid: $5/month (1,000 credits, rollover) or $54/year (12,000 credits); top-ups $5 per 1,000.

## Permissions and scope

These scripts read one environment variable (`INSTADATA_KEY`), send HTTPS requests to `https://api.instadata.dev` (a constant in the code), and print JSON. No other shell use, no file writes, no persistence. `call_endpoint.js` accepts only the 28 documented `/v1/instagram/` paths below.

## Scripts

| Script | What it does | Input | Credits |
|---|---|---|---|
| `get_profile.js` `--section=full` | profile full | handle | 1 credit per profile |
| `get_profile.js` `--section=about` | profile about | handle | 4 credits per profile |
| `get_profile.js` `--section=search` | profile search | query | 1 credit per profile, paginated |
| `get_profile.js` `--section=similar` | similar | handle | 1 credit per profile |
| `get_profile.js` `--section=tagged` | tagged | handle | 1 credit per post, paginated |
| `get_profile.js` `--section=mentions` | Posts by other accounts that tag or @-mention the profile, in the standard post shape. | handle | 1 credit per post, paginated |
| `get_profile.js` `--section=comments` | Recent comments across a profile's latest posts, one row per comment with the post it was left on. comments is for one post you already have. | handle | 1 credit per comment, paginated |
| `get_profile.js` `--section=collaborations` | Paid-partnership posts, reels and stories between a creator and brands, for a creator's or a brand's profile. 3 credits per row. | handle | 3 credits per collaboration, paginated |
| `get_channel.js` `--section=stats` | channel stats | handle | 1 credit per profile |
| `get_channel.js` `--section=posts` | channel posts | handle | 1 credit per post, paginated |
| `get_channel.js` `--section=reels` | channel reels | handle | 1 credit per reel, paginated |
| `get_hashtag.js` `--section=posts` | Posts that carry the hashtag. | query | 1 credit per post, paginated |
| `get_hashtag.js` `--section=reels` | Reels only (video) that carry the hashtag. | query | 1 credit per reel, paginated |
| `get_hashtag.js` `--section=stats` | Numbers for one hashtag you already know: post count, posts per day and related tags. Returns no posts. | query | 1 credit per hashtag |
| `get_hashtag.js` `--section=analytics` | Everything hashtag-stats returns for one hashtag, plus its current top posts. | query | 4 credits per hashtag |
| `get_hashtag.js` `--section=search` | Finds hashtags matching a keyword, each with its post count and related tags. Returns hashtags, not posts; use hashtag-posts for the posts. | query | 1 credit per hashtag, paginated |
| `get_location.js` `--section=search` | location search | query | 1 credit per place, paginated |
| `get_location.js` `--section=stats` | location stats | query | 1 credit per place |
| `get_location.js` `--section=posts` | location posts | query | 1 credit per post, paginated |
| `search.js` `--section=keyword-search` | Posts found by Instagram's keyword search, including posts that never used the word as a hashtag. | query | 1 credit per result, paginated |
| `search.js` `--section=reels-search` | reels search | query | 1 credit per result, paginated |
| `get_ads.js` `--section=search` | Ads in the Meta Ad Library matching a keyword, with the advertiser's Instagram handle when it has one. 3 credits per ad. | query | 3 credits per ad, paginated |
| `get_ads.js` `--section=by-page` | Ads one advertiser is running, from its Facebook Page URL or Ad Library page URL passed as query. 3 credits per ad. | query | 3 credits per ad, paginated |
| `get_transcript.js` | Spoken words of a public reel or video post as plain text. 1 credit for the reel plus 20 per started minute of video. | url | 1 credit + 20 per started minute |
| `get_transcript.js` `--section=summary` | Short summary and key points of a public reel or video post, built on the same per-minute transcript. 4 credits plus 20 per started minute of video. | url | 4 credit + 20 per started minute |
| `get_comments.js` | comments | url | 1 credit per comment, paginated |
| `get_stats.js` | stats | url | 1 credit per post |
| `get_download.js` | download | url | 8 credits per video |
| `call_endpoint.js` | Call any documented `/v1/instagram/` endpoint directly | path + params | varies |

Every script also accepts `--limit`, `--cursor`, `--fields`, `--format` and `--fresh`. `--limit` is clamped to 50 (above that the API creates a job).

## Example

```bash
node skills/instagram-api/scripts/get_channel.js nasa --section=stats
node skills/instagram-api/scripts/get_transcript.js https://www.instagram.com/reel/XXXX/
```

Every response: `{ "data": ..., "meta": { ... }, "request_id": "..." }` (`meta` on lists). Keep `request_id` for support. Failed calls are never charged.

## Endpoints

| Endpoint | Input | Credits | Paginated |
|---|---|---|---|
| `/v1/instagram/transcript` | url | 1 credit + 20 per started minute | no |
| `/v1/instagram/summary` | url | 4 credit + 20 per started minute | no |
| `/v1/instagram/stats` | url | 1 credit per post | no |
| `/v1/instagram/comments` | url | 1 credit per comment, paginated | yes |
| `/v1/instagram/channel-stats` | handle | 1 credit per profile | no |
| `/v1/instagram/channel-posts` | handle | 1 credit per post, paginated | yes |
| `/v1/instagram/channel-reels` | handle | 1 credit per reel, paginated | yes |
| `/v1/instagram/reels-search` | query | 1 credit per result, paginated | yes |
| `/v1/instagram/download` | url | 8 credits per video | no |
| `/v1/instagram/profile-full` | handle | 1 credit per profile | no |
| `/v1/instagram/profile-about` | handle | 4 credits per profile | no |
| `/v1/instagram/similar` | handle | 1 credit per profile | no |
| `/v1/instagram/tagged` | handle | 1 credit per post, paginated | yes |
| `/v1/instagram/hashtag-posts` | query | 1 credit per post, paginated | yes |
| `/v1/instagram/hashtag-reels` | query | 1 credit per reel, paginated | yes |
| `/v1/instagram/keyword-search` | query | 1 credit per result, paginated | yes |
| `/v1/instagram/hashtag-stats` | query | 1 credit per hashtag | no |
| `/v1/instagram/hashtag-analytics` | query | 4 credits per hashtag | no |
| `/v1/instagram/hashtag-search` | query | 1 credit per hashtag, paginated | yes |
| `/v1/instagram/profile-search` | query | 1 credit per profile, paginated | yes |
| `/v1/instagram/location-search` | query | 1 credit per place, paginated | yes |
| `/v1/instagram/location-stats` | query | 1 credit per place | no |
| `/v1/instagram/location-posts` | query | 1 credit per post, paginated | yes |
| `/v1/instagram/mentions` | handle | 1 credit per post, paginated | yes |
| `/v1/instagram/ads-search` | query | 3 credits per ad, paginated | yes |
| `/v1/instagram/ads-by-page` | query | 3 credits per ad, paginated | yes |
| `/v1/instagram/collaborations` | handle | 3 credits per collaboration, paginated | yes |
| `/v1/instagram/profile-comments` | handle | 1 credit per comment, paginated | yes |

## MCP alternative

Hosted MCP server (Streamable HTTP): `https://mcp.instadata.dev` — OAuth 2.1 + PKCE or `Authorization: Bearer ik_live_...`. Tools: get_transcript, get_summary, get_post_stats, get_comments, get_profile, get_channel_posts, search_hashtag, download_media, list_endpoints, call_endpoint.

## Links

- [instadata.dev](https://instadata.dev) · [Docs](https://instadata.dev/docs/quickstart/) · [OpenAPI](https://instadata.dev/openapi.json) · [llms.txt](https://instadata.dev/llms.txt)

## Disclaimer

Instadata is independent and not affiliated with, endorsed by, or sponsored by Instagram or Meta Platforms, Inc. Returns publicly available data only.
