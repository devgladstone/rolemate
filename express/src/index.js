import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import auth from './routes/auth.js'
import aws from './routes/aws.js'
import verify from './routes/verify.js'

const app = express()
const PORT = process.env.PORT || 3000
const DOMAIN = process.env.DOMAIN
const whitelist = [DOMAIN]
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.set('trust proxy', 1)
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(cors(corsOptions));

app.use(limiter);
app.use('/auth', auth)
app.use('/file', aws)
app.use('/verify', verify)

// error handler
app.use((err, _req, res, _next) => {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return res.status(err.output.statusCode || 500).json(err.output.payload);
  }
});

app.listen(PORT, () => {
  console.log(`App 👂 at http://localhost:${PORT}`)
})