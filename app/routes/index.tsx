import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import { type AppType } from '../server'

const apiClient = hc<AppType>(import.meta.env.VITE_API_URL, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

export const Route = createFileRoute('/')({
  loader: async () => {
    const welcomeText = await apiClient.api.welcome.$get().then(res => res.text())
    return { welcomeText }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { welcomeText } = Route.useLoaderData()

  const [count, setCount] = useState(0)

  const handleIncrement = async () => {
    const response = await apiClient.api.counter
      .$post({ json: { id: '1', count: count + 1 } })
      .then(res => res.json())
    setCount(response.count)
  }

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-[10px] bg-red-900">
      <span className="text-white">{welcomeText}</span>
      <div className="flex flex-col gap-2">
        <Link to="/about" className="text-white underline">
          About
        </Link>
      </div>
      <button
        type="button"
        onClick={handleIncrement}
        className="rounded-md bg-blue-500 p-2 text-white">
        Counter: {count}
      </button>
    </div>
  )
}
