# Security

The scripts read only `INSTADATA_KEY`, send it only to the constant host `https://api.instadata.dev`, write no files, and run no shell commands. `call_endpoint.js` refuses any path outside the 28 documented `/v1/instagram/` endpoints.

Report vulnerabilities to support@instadata.dev. Do not open public issues for security problems.
