const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        min: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        // max: 1024,
        min: 6
    },
    roles : {
        type: Object
    }
    
},{timestamps:true})

module.exports = mongoose.model('Usuario',userSchema)