/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    serverUrl: 'http://161.35.64.102:8000/api', //process.env.SERVER_URL,
  }
}

module.exports = nextConfig
