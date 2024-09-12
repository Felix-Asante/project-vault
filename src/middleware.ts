import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/projects/:path*', '/'])

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect()
})
// provide clerk auth status to all routes
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
