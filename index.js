import express from 'express'
import mongoose from 'mongoose'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import MongoStore from 'connect-mongo'
import * as AdminJSMongoose from '@adminjs/mongoose'
import User from './models/User.js'
import { files } from './resource/file.js'
import TestResource from './resource/test.js'
import { componentLoader } from './components/components.js'

const PORT = process.env.PORT || 3003

const start = async () => {
  const app = express()

  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  })
  const admin = new AdminJS({
    resources: [
      User,
      files,
      TestResource
    ],
    componentLoader
  })

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
    const user = await User.findOne({
      email,
      password
    })
    if (user) {
      return Promise.resolve(user)
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
  app.use('/static', express.static('public'))

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

