import app from './src/server'
import { config } from 'dotenv'

config()

app.listen(3001, () => { console.log('Server start on port 3001') })
