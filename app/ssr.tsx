import { getRouterManifest } from '@tanstack/start/router-manifest'
import {
  createStartHandler,
  defaultRenderHandler,
  defaultStreamHandler,
} from '@tanstack/start/server'
import * as process from 'node:process'
import { createRouter } from './router'

const preset = process.env.PRODUCTION_PRESET || 'bun'

const handler: typeof defaultStreamHandler = async ({ request, router, responseHeaders }) => {
  const { pathname } = new URL(request.url)

  // TODO: Fill an issue about this to bun and tanstack
  if (pathname === '/bun-stream-error' && preset === 'bun') {
    return defaultStreamHandler({ request, router, responseHeaders })
  }

  const defaultHandler = preset === 'bun' ? defaultRenderHandler : defaultStreamHandler

  return defaultHandler({ request, router, responseHeaders })
}

export default createStartHandler({ createRouter, getRouterManifest })(handler)
