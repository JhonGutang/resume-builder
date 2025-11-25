import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { connectDB } from '../lib/mongo'
import { trpcMiddleware } from '../../../packages/trpc/trpc'
import { appRouter } from '../../../packages/trpc'

const app = express()
const port = 3000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

const startServer = async () => {
  try {
    const db = await connectDB()
    console.log('Database connected successfully')
    
    app.use(
      '/trpc',
      trpcMiddleware(appRouter, db)
    )
    console.log('tRPC middleware registered at /trpc')
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
      console.log(`tRPC endpoint available at http://localhost:${port}/trpc`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
