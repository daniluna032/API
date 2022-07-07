const express = require('express')
const { expressjwt } = require('express-jwt')
const httpStatus = require('./helpers/httpStatus')
const People = require('./models/peopleModel')
const peopleRouter = require('./routes/peopleRouter')(People)
const authRouter = require('./routes/authRouter')(People)
const Patients = require('./models/patientsModel')
const patientsRouter = require('./routes/patientsRouter')(Patients)


const app = express()

require('./database/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.all('/*' , expressjwt({secret: 'unaContraseñaSecreta' , algorithms: ['HS256']}).unless({
  path: ['/auth/login', '/auth/register']
}))

app.use((err, _, res, next) => {
  if (err.name === 'UnauthorizedError'){
      return res.status(httpStatus.UNAUTHORIZED).json({
          error: err.name,
          cause: 'no estas autorizado, pone una token valida'
      })
  } else {
      next(err)
  }
})

app.use('/api', peopleRouter , patientsRouter)

app.use('/', authRouter)
// localhost:5000/auth/login

app.listen(5000, () => {
  console.log('Server is running!')
})
