import { createStartAPIHandler } from '@tanstack/start/api'
import server from './server'

// export default createStartAPIHandler(defaultAPIFileRouteHandler)
export default createStartAPIHandler(({ request }) => server.fetch(request))
