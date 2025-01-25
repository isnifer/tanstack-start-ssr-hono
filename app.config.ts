import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    // preset: 'bun',
    preset: 'vercel',
    runtimeConfig: {
      app: {
        baseURL: 'https://tanstack-start-ssr-hono.vercel.app',
      },
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],

    // @ts-expect-error — it's removed only from the schema, but it's still available
    clearScreen: false,
  },
})
