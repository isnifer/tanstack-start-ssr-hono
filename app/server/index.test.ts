import { describe, expect, test } from 'bun:test'
import { testClient } from 'hono/testing'
import app from './'

describe('server', () => {
  const client = testClient(app, { NODE_ENV: Bun.env.NODE_ENV })

  test('/welcome should return 200', async () => {
    const response = await client.api.welcome.$get()
    expect(response.status).toBe(200)
    expect(await response.text()).toBe(
      'Welcome to the home page! I hope it is server side rendered text!'
    )
  })

  test('/counter should return 200', async () => {
    const response = await client.api.counter.$post({ json: { id: '1', count: 1 } })

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ count: 1 })

    const response2 = await client.api.counter.$post({ json: { id: '1', count: 2 } })

    expect(response2.status).toBe(200)
    expect(await response2.json()).toEqual({ count: 2 })

    const response3 = await client.api.counter.$post({ json: { id: '10', count: 42 } })

    expect(response3.status).toBe(200)
    expect(await response3.json()).toEqual({ count: 42 })
  })

  test('/protected should return 401', async () => {
    const response = await client.api.protected.$post()
    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ message: 'Unauthorized' })
  })

  test('/protected should return 200', async () => {
    const response = await client.api.protected.$post({}, { headers: { Authorization: '123' } })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ message: 'Hello from the protected route! 123' })
  })
})
