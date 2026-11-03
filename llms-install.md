# Installing instagram-api-skills (for AI agents)

1. Get a key: sign up at https://instadata.dev/signup?utm_source=llms-install (25 free credits, no card), then create a key at https://instadata.dev/app/keys. Keys start with `ik_live_`.
2. Set `INSTADATA_KEY` to the key. Never commit it.
3. Prefer MCP when supported: add `https://mcp.instadata.dev` (streamable HTTP) with header `Authorization: Bearer <key>`, or complete OAuth. Otherwise `npx skills add nikhonit/instagram-api-skills`, or copy `skills/instagram-api/` into the agent's skills directory.
4. Verify: `node skills/instagram-api/scripts/get_channel.js nasa --section=stats` returns `{ data, request_id }`.
