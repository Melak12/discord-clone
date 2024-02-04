/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
          "utf-8-validate": "commonjs utf-8-validate",
          bufferutil: "commonjs bufferutil"
        });
    
        return config;
      },
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
