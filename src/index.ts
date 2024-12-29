import express, { Express, Request, Response} from 'express'
import 'dotenv/config'
import { json } from 'body-parser'
import cors from 'cors'

import router from './routes'

const app: Express = express()

app.use(cors())
app.use(json())

app.get('/', (req: Request, res: Response)=>{
    res.send('<h3>Kinobi assessment API</h3>')
})  

app.use('/api', router)

app.listen(process.env.PORT, ()=> {
    console.log(`TS server is running on ...${process.env.PORT}`)
})