import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes.js'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config()

const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET

const server = express()
server.use(cors())
server.timeout = 300000;
server.use(express.json())
server.use(router)

server.listen(PORT, ()=>{
    console.log("Rodando servidor!")
})
