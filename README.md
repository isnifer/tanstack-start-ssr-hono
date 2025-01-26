# Tanstack Start (SSR) + Hono (API)

## Documentation

### I've built from scratch this project using Tanstack Start documentation.

- [Tanstack Start Docs](https://tanstack.com/router/latest/docs/framework/react/start/build-from-scratch)

## Motivation

In my opinion, Tanstack Start is a great way to build a SSR application.

But I've found some issues when trying to build the project.

- Recommended way to build API is server-side functions, not API routes. `Nitro` way to write API routes looks ugly.
- I decided to use Hono for API, because it's a simple and easy to use server-side framework.
- Both server-side frameworks are compatible with Standard Web APIs — Request, Response, fetch, etc. That's why I decided to rewrite default API handler to use Hono like this:

```ts
// app/api.ts
import { createStartAPIHandler } from '@tanstack/start/api'
import server from './server'

export default createStartAPIHandler(({ request }) =>
  server.fetch(request, { NODE_ENV: process.env.NODE_ENV })
)
```

- Rich functionality of Hono helps to build better API routes. They will be available on the web, mobile, and any other platforms.
- I love Tanstack Router that's why I decided to use Start to render an app on the server. Start is the simplest way to render an app on the server with Tanstack Router.

## Important changes for Bun

- All `vinxi` commands are replaced with `bunx --bun` prefix to run them with Bun.
- Hono `fetch` function accepts not only `Request` object, but also `Bindings` from `Bun.env`.
- `app.config.ts` accepts `preset: 'bun'` in the `server` section.
