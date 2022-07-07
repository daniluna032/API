const jwt = require('jsonwebtoken')

const generateToken = () => {
    const token = 
    jwt.sign({
        data: 'aqui van los datos'
    }, process.env.SECRET , { expiresIn:'1h' })
    
    return token
}

module.exports = generateToken