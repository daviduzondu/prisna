/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
            }
        ]
    }
}

module.exports = nextConfig
