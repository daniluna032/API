const bcrypt = require('bcrypt')
const generateToken = require('../helpers/generateToken')
const httpStatus = require('../helpers/httpStatus')

const authController = (People) => {
  const logIn = async (req, res, next) => {
      try {
          const { body } = req
          const user = await People.findOne({
              username: body.username
          })
          if (
              user === null || !(await bcrypt.compare(body.password, user.password))
          ) {
              return res.status(httpStatus.FORBIDDEN).send('invalid credentials')
          }
          const token = generateToken()

          return res.status(httpStatus.OK).json({
              status: 'logged',
              token
          })
      } catch (err) {
          next(err)
      }
  }

  const register = async (req,res) => {
    try {
        const { body } = req
  
        const encryptedPassword = await bcrypt.hash(body.password, 10)
  
        const encryptedData = {
          ...body,
          password: encryptedPassword
        }
  
        const people = await new People(encryptedData)
  
        await people.save()
  
        return res.status(httpStatus.CREATED).json(people)
      } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
      }
    }

  return {logIn, register}
}

module.exports = authController
