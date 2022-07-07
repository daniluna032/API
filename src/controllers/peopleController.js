const bcrypt = require('bcrypt')
const httpStatus = require('../helpers/httpStatus')

const peopleController = (People) => {
  const getAllPeople = async (req, res) => {
    try {
      const { query } = req

      const response = await People.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
    }
  }

  const postPeople = async (req, res) => {
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
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: err.name,
        cause: err.message
      })
    }
  }

  const putPeopleById = async (req, res) => {
    try {
      const { body, params } = req

      const checkData = await People.find({
        _id: params.id
      })

      if (checkData === null) {
        return res.status(httpStatus.FORBIDDEN).send('No data found with the provided ID.')
      }

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      await People.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password: encryptedPassword,
            email: body.email,
            address: body.address,
            phone: body.phone
          }
        }
      )

      return res.status(httpStatus.CREATED).send('Data successful updated')
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
    }
  }

  const getPeopleById = async (req, res) => {
    try {
      const { params } = req

      const response = await People.findById(params.id)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
    }
  }

  const deletePeopleById = async (req, res) => {
    try {
      const { params } = req

      await People.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('Data successful deleted')
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
    }
  }

  return {
    getAllPeople,
    getPeopleById,
    postPeople,
    putPeopleById,
    deletePeopleById
  }
}

module.exports = peopleController
