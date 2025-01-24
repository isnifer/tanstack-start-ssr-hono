import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const cache = new Map<string, number>()

const app = new Hono()
  .basePath('/api')

  .get('/welcome', c => c.text('Welcome to the home page! I hope it is server side rendered text!'))

  .post('/counter', zValidator('json', z.object({ id: z.string(), count: z.number() })), c => {
    console.log('Hello from Hono!')

    const { id, count } = c.req.valid('json')

    cache.set(id, count)

    return c.json({ count }, 200)
  })

  .get('*', c => c.text(`Log found: ${c.req.url}`, 404))

export type AppType = typeof app

export default app
