const httpStatus = require('../helpers/httpStatus')

const ERROR_HANDLERS = {
    SyntaxError: (res, err) => {
        res.status(httpStatus.NOT_FOUND).send({error: err.name, cause: err.message, message: 'error de tipado, porfavor revisa el tipado' })
    }
   
}

const errorHandler = (err, req, res, next) => {
    const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
    handler(res, err)
}

module.exports = errorHandler
