const mongoose = require('mongoose')

const { Schema } = mongoose


const patientsModel = new Schema({
    firstName: { type: String, required: true, minLength: 3, maxLength: 30 },
    lastName: { type: String, required: true, minLength: 3, maxLength: 30 },
    phone: { type: Number, required: true, unique: true },
    age: {type: Number, required: true},
    sex: {type: String , required: true},
    weight: {type: String , required: true}
    
  })
  

  module.exports = mongoose.model('Patients', patientsModel)