import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    preset: 'bun',
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})
