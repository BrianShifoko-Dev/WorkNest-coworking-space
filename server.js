#!/usr/bin/env node

/**
 * WorkNest Production Server for cPanel Node.js Deployment
 *
 * This server file is specifically designed for cPanel hosting environments.
 * It starts the Next.js production server with proper configuration.
 *
 * Usage:
 * - In cPanel Node.js App setup, set this as your "Application Startup File"
 * - Ensure you've run `npm run build` before deploying
 */

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// Environment configuration
const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || process.env.HOST || 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

console.log('🚀 Starting WorkNest Server...')
console.log(`📍 Environment: ${dev ? 'Development' : 'Production'}`)
console.log(`📍 Hostname: ${hostname}`)
console.log(`📍 Port: ${port}`)

// Initialize Next.js app
const app = next({
  dev,
  hostname,
  port,
  // Disable file watching in production (important for cPanel)
  ...(dev ? {} : { conf: { compress: true, poweredByHeader: false } })
})

const handle = app.getRequestHandler()

// Prepare Next.js and start server
app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        // Parse URL
        const parsedUrl = parse(req.url, true)

        // Handle request with Next.js
        await handle(req, res, parsedUrl)
      } catch (err) {
        console.error('❌ Error handling request:', err)
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    })
    .listen(port, hostname, (err) => {
      if (err) {
        console.error('❌ Failed to start server:', err)
        process.exit(1)
      }

      console.log(`✅ WorkNest server ready!`)
      console.log(`🌐 Server running at: http://${hostname}:${port}`)
      console.log(`📊 Visit https://theworknest.co.ke to see your site`)
      console.log(`🔧 Admin dashboard: https://theworknest.co.ke/admin`)
      console.log('')
      console.log('💡 Server logs will appear below:')
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use`)
        console.error('💡 Try changing the PORT environment variable in cPanel')
      } else {
        console.error('❌ Server error:', err)
      }
      process.exit(1)
    })
  })
  .catch((err) => {
    console.error('❌ Failed to prepare Next.js app:', err)
    process.exit(1)
  })

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM signal received: closing HTTP server')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🛑 SIGINT signal received: closing HTTP server')
  process.exit(0)
})

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})
