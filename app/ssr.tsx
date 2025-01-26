import { getRouterManifest } from '@tanstack/start/router-manifest'
import {
  createStartHandler,
  defaultRenderHandler,
  defaultStreamHandler,
} from '@tanstack/start/server'
import * as process from 'node:process'
import { createRouter } from './router'

const preset = process.env.PRODUCTION_PRESET || 'bun'
const handler = preset === 'bun' ? defaultRenderHandler : defaultStreamHandler

export default createStartHandler({ createRouter, getRouterManifest })(handler)
