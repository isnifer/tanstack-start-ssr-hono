import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

const cache = new Map<string, number>()

const app = new Hono<{
  Bindings: { NODE_ENV: string }
  Variables: { user: string | null }
}>()
  .basePath('/api')

  .get('/welcome', c => {
    if (c.env.NODE_ENV === 'development') {
      console.log('✅', 'THERE IS NO LOGGER MESSAGES BEFORE THIS ROUTE')
    }

    return c.text('Welcome to the home page! I hope it is server side rendered text!')
  })

  .use(async (c, next) => {
    const header = c.req.header('Authorization')

    if (c.env.NODE_ENV === 'development') {
      console.log('✅', 'Just a logger middleware:', { Authorization: header })
    }

    return next()
  })

  .post('/counter', zValidator('json', z.object({ id: z.string(), count: z.number() })), c => {
    const user = c.get('user')

    if (c.env.NODE_ENV === 'development') {
      console.log(!user ? '✅' : '❌', 'I EXPECT DO NOT SEE ANY USER IN THE CONTEXT', user)
    }

    const { id, count } = c.req.valid('json')
    cache.set(id, count)

    return c.json({ count }, 200)
  })

  .use(async (c, next) => {
    const header = c.req.header('Authorization')

    if (!header) {
      if (c.env.NODE_ENV === 'development') {
        console.log('✅', 'I DO NOT EXPECT TO SEE A USER IN THE CONTEXT')
      }

      throw new HTTPException(401, {
        message: 'You shall not pass!',
        res: new Response(JSON.stringify({ message: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }),
      })
    }

    c.set('user', header)

    return next()
  })

  .post('/protected', c => {
    const user = c.get('user')

    if (c.env.NODE_ENV === 'development') {
      console.log(user ? '✅' : '❌', 'I EXPECT TO SEE A USER IN THE CONTEXT', user)
    }

    return c.json({ message: `Hello from the protected route! ${user}` }, 200)
  })

export type AppType = typeof app

export default app
