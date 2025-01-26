// import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from '@tanstack/start/config'
import * as process from 'node:process'
import tsConfigPaths from 'vite-tsconfig-paths'

const preset = process.env.PRODUCTION_PRESET || 'bun'

export default defineConfig({
  server: { preset },
  vite: {
    plugins: [
      // tailwindcss(), // currently css bundled via PostCSS
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],

    // @ts-expect-error — it's removed only from the schema, but it's still available
    clearScreen: false,
  },
})
