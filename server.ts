import express from 'express'
import axios from 'axios'
import { Stream } from 'stream'
import route from './route.js'
const app = express()
const port  = 3000
app.use('/api', route('http://api.vikingship.xyz')
)
app.use(express.static('dist'))

app.listen(port, () => {
  console.log(`http://localhost:${3000}`);
  
})
