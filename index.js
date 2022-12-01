import express from 'express'
import mongoose from 'mongoose'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const PORT = process.env.PORT || 3003



const start = async () => {
  const app = express()

  const admin = new AdminJS({})

  const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO || 'mongodb://localhost:27017/admin'
  })

  const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
  }

  const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
  }

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  )
  app.use(admin.options.rootPath, adminRouter)


  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

mongoose.connect(process.env.MONGO || 'mongodb://localhost:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error('Mongodb connection error', error)
})

db.once('open', async() => {
  console.log('Mongodb connection success')
  start()


  if (process.env.APP_ENV !== 'loc') {

  }
})

