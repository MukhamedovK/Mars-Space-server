const mongoose = require('mongoose')


const AuthSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Students'
    } 
})

module.exports = mongoose.model('Auths', AuthSchema)