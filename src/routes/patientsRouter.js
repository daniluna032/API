const express = require('express')
const patientsController = require('../controllers/patientsController')
const validator = require('express-joi-validation').createValidator({})
const {paramsSchema , querySchema, bodySchema} = require('../validations/patientsBodyValidator')


const router = (Patients) => {
  const patientsRouter = express.Router()

  const { getAllPatients, getPatientsById, postPatients, putPatientsById, deletePatientsById } =
    patientsController(Patients)

  patientsRouter
    .route('/patients')
    .get(validator.query(querySchema) , getAllPatients)
    .post(validator.body(bodySchema), postPatients)

  patientsRouter
    .route('/patients/:id')
    .get(validator.params(paramsSchema) , getPatientsById)
    .put(validator.body(bodySchema), putPatientsById)
    .delete(validator.params(paramsSchema), deletePatientsById)



  return patientsRouter
}

module.exports = router