import express from 'express'
import path from 'path'
import router from './routers/router.js'

import {badRequest} from './middlewares/middleware.js'

const __dirname = path.resolve();

const app = express()
app.use(express.json())

const hostname = '127.0.0.1'
const port = 3000

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/\nStart: ${new Date()}`)
})

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(router)

app.use(badRequest)