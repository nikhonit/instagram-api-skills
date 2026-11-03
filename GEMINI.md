# Instadata for Gemini CLI

This extension connects Gemini CLI to the Instadata MCP server (https://mcp.instadata.dev), which returns public Instagram data as JSON: profiles, posts, reels, comments, hashtags, places, ads and reel transcripts.

Setup: create a free key (25 credits, no card) at https://instadata.dev/signup?utm_source=gemini-cli, then export INSTADATA_KEY before starting Gemini CLI. Every tool call spends credits; failed calls are free.

Use the tools only when the user asks for data about a specific Instagram profile, post, hashtag, place or reel. Public data only; Instadata is independent and not affiliated with Instagram or Meta.
