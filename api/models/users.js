const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true},
    avatar: { type: String},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
})

const user = mongoose.model('User', userSchema)

module.exports = user