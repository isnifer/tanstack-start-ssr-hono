import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import { toast } from 'sonner'
import { type AppType } from '../server'

const apiClient = hc<AppType>(import.meta.env.VITE_API_URL, {
  init: { credentials: 'include' },
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

  const handleClickIncrement = async () => {
    const response = await apiClient.api.counter
      .$post({ json: { id: '1', count: count + 1 } })
      .then(res => res.json())
    setCount(response.count)
  }

  const handleClickProtected = async (passHeaders: boolean) => {
    try {
      const response = await apiClient.api.protected
        .$post(
          {},
          {
            headers: passHeaders
              ? {
                  Authorization: 'Bearer hello-my-name-is-josh',
                }
              : undefined,
          }
        )
        .then(async res => {
          const json = await res.json()
          if (!res.ok) {
            throw new Error(json.message)
          }

          return json
        })

      toast.success(response.message)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occurred', {
          description: JSON.stringify(error),
        })
      }
    }
  }

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-[10px] bg-red-900">
      <span className="text-white">{welcomeText}</span>
      <div className="flex flex-col gap-2">
        <Link to="/about" className="text-white underline">
          About
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleClickIncrement}
          className="rounded-md bg-blue-500 p-2 text-white">
          Counter: {count}
        </button>
        <button
          type="button"
          onClick={() => handleClickProtected(false)}
          className="rounded-md bg-blue-500 p-2 text-white">
          Protected without headers
        </button>
        <button
          type="button"
          onClick={() => handleClickProtected(true)}
          className="rounded-md bg-blue-500 p-2 text-white">
          Protected with headers
        </button>
      </div>
    </div>
  )
}
