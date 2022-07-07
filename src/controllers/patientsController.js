const httpStatus = require('../helpers/httpStatus')

const patientsController = (Patients) => {
  
    const getAllPatients = async (req, res) => {
    try {
      const { query } = req

      const response = await Patients.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
    }
  }

  const postPatients = async (req, res) => {
    try {
      const { body } = req
      const patients = await new Patients (body)

        await patients.save()

      return res.status(httpStatus.CREATED).json(patients)

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: err.name,
        cause: err.message
      })
    }
  }

  const putPatientsById = async (req, res) => {
    try {
      const { body, params } = req

      const checkData = await Patients.find({
        _id: params.id
      })

      if (checkData === null) {
        return res.status(httpStatus.FORBIDDEN).send('No data found with the provided ID.')
      }


      await Patients.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            age: body.age,
            sex: body.sex,
            weight: body.weight
          }
        }
      )

      return res.status(httpStatus.CREATED).send('Data successful updated')
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
    }
  }

  const getPatientsById = async (req, res) => {
    try {
      const { params } = req

      const response = await Patients.findById(params.id)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
    }
  }

  const deletePatientsById = async (req, res) => {
    try {
      const { params } = req

      await Patients.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('Data successful deleted')
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.name)
    }
  }

  return {
    getAllPatients,
    getPatientsById,
    postPatients,
    putPatientsById,
    deletePatientsById
  }
}

module.exports = patientsController
