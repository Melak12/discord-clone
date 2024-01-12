/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com',

            },
            {
                protocol: 'https',
                hostname: 'utfs.io',

            }
        ],
    },
}

module.exports = nextConfig
