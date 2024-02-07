const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
    name: { type: String, require: true },
    color: { type: String, require: true },
    readyToEat: Boolean
})

const Fruit = mongoose.model('Fruit', fruitSchema)

module.exports = Fruit