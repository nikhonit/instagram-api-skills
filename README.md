# Instagram API Skills — Instadata

Agent skill for **public Instagram data** — profiles, posts, reels, comments, hashtags, places, mentions, brand collaborations, Meta Ad Library ads, and reel transcripts — through the [Instadata](https://instadata.dev) Instagram Data API. Plain Node.js 20+, zero dependencies. Works with Claude Code, Cursor, Codex, Gemini CLI, and any agent that can run `node`.

Prefer MCP? Use the hosted server at **https://mcp.instadata.dev** (Streamable HTTP, OAuth 2.1 + PKCE, or a bearer key).

## Install

```bash
npx skills add nikhonit/instagram-api-skills
```

Or copy `skills/instagram-api/` into your agent's skills directory.

**MCP (Claude, Cursor, ChatGPT, any MCP client):**

```json
{ "mcpServers": { "instadata": { "url": "https://mcp.instadata.dev", "headers": { "Authorization": "Bearer ${INSTADATA_KEY}" } } } }
```

**Gemini CLI:** `gemini extensions install https://github.com/nikhonit/instagram-api-skills`

## Quickstart

```bash
export INSTADATA_KEY=ik_live_...        # https://instadata.dev/app/keys — 25 free credits, no card
node skills/instagram-api/scripts/get_channel.js nasa --section=stats
node skills/instagram-api/scripts/get_channel.js nasa --section=reels --limit 10
node skills/instagram-api/scripts/get_transcript.js https://www.instagram.com/reel/XXXX/
node skills/instagram-api/scripts/get_hashtag.js latteart --section=analytics
node skills/instagram-api/scripts/call_endpoint.js /v1/instagram/mentions --handle nasa
```

## What's in the skill

28 endpoints under `https://api.instadata.dev/v1/instagram/`, wrapped by these scripts (full table with per-call credits in [`skills/instagram-api/SKILL.md`](skills/instagram-api/SKILL.md)):

| Script | Covers |
|---|---|
| `get_profile.js` | profile-full, profile-about, profile-search, similar, tagged, mentions, profile-comments, collaborations |
| `get_channel.js` | channel-stats, channel-posts, channel-reels |
| `get_hashtag.js` | hashtag-posts, hashtag-reels, hashtag-stats, hashtag-analytics, hashtag-search |
| `get_location.js` | location-search, location-stats, location-posts |
| `search.js` | keyword-search, reels-search |
| `get_ads.js` | ads-search, ads-by-page (Meta Ad Library) |
| `get_transcript.js` | transcript, summary |
| `get_comments.js` / `get_stats.js` / `get_download.js` | comments, stats, download |
| `call_endpoint.js` | any of the 28 documented paths (allow-listed) |

## What you get back

```json
{ "data": {}, "meta": { "count": 20, "next_cursor": "..." }, "request_id": "a18e4ef88ad4b00b" }
```

Lists take `--limit` (max 50 synchronous) and `--cursor`. Any call takes `--fresh`, `--fields a,b.c`, `--format json|csv|text`. Failed calls are never charged.

## Authentication

One header: `Authorization: Bearer ik_live_...`. Scripts read it from `INSTADATA_KEY` and only ever send it to `api.instadata.dev` (hard-coded).

## Pricing

| Plan | Price | Credits |
|---|---|---|
| Free | $0 | 25 at signup, no card (5 items per list call) |
| Monthly | $5/mo | 1,000/month, unused roll over; top-ups $5 per 1,000 |
| Annual | $54/yr | 12,000 up front; top-ups $4 per 1,000 |

Most calls cost 1 credit per item; transcripts are 1 credit + 20 per started minute. See [instadata.dev/pricing](https://instadata.dev/pricing/).

## Links

[instadata.dev](https://instadata.dev) · [Docs](https://instadata.dev/docs/quickstart/) · [Endpoints](https://instadata.dev/endpoints/) · [OpenAPI](https://instadata.dev/openapi.json) · [llms.txt](https://instadata.dev/llms.txt) · [MCP server card](https://instadata.dev/.well-known/mcp/server-card.json)

## License

MIT-0. See [LICENSE](LICENSE).

## Disclaimer

Instadata is an independent product and is not affiliated with, endorsed by, or sponsored by Instagram or Meta Platforms, Inc. These skills return only publicly available data.
