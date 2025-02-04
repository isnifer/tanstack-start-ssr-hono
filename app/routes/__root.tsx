import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import { Toaster } from 'sonner'
import rootCSS from '../index.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: rootCSS,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: '',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        rel: 'stylesheet',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <div className="flex h-[100dvh] items-center justify-center">Not Found</div>
  ),
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <Toaster richColors />
    </RootDocument>
  )
}

function RootDocument({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body id="root">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
