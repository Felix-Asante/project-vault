/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: () => [
        {
            source: '/',
            destination: '/projects',
            permanent: true,
        },
    ],
}

export default nextConfig
