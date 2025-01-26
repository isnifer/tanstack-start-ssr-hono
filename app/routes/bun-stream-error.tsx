import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bun-stream-error')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Try constantly refreshing this page until it start reloading too long</div>
}
