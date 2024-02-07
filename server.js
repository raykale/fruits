require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const Fruit = require('./models/fruit')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({extended: true }))//build a ssr website
// app.use(express.json()) //build a api
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb')
})

app.listen(PORT, () =>{
    console.log(`Yurr the Port at ${PORT} is a go`)
})

// INDUCES

// INDEX
// list all fruits
app.get('/fruits', async (req, res) => {
    try {
        const foundFruits = await Fruit.find({})
        res.render('fruits/Index', {
            fruits: foundFruits
    })
} catch (error) {
    res.status(400).send({message: error.message })        
    }
})

// NEW
// show the user a form to fill out to create a fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New')
})
// DELETE
// backend only functionality that is used to delete a fruit

// UPDATE
// backend only functionality that is used to update a fruit

// CREATE
// backend only functionality that is used to create a fruit

app.post('/fruits', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    try{
        const createdFruit = await Fruit.create(req.body)
        res.redirect(`/fruits/${createdFruit._id}`)
    }catch (error) {
        res.status(400).send({message: error.message})
    }

})

// EDIT
// show you a form that let you edit the fruit

// SHOW
// shows you one individual fruit
app.get('/fruits/:id', async (req, res) => {
    try {
        const foundFruit = await Fruit.findOne({_id: req.params.id})
        res.render('fruits/Show', {
            fruit: foundFruit
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})