const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const listTasks = require('./routes/task-list')
const addNew = require('./routes/add')

const dbPath = path.join(__dirname, 'data/data.json')

app.use(express.static('public'))

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended : false }))

// app.use
app.use('/tasks', listTasks)
app.use('/add', addNew)



app.listen(3000, (err) => {
    if (err) throw err

    console.log("Server is running on 3000")
})

app.all('/', (req, res, next) => {
    console.log(`Incoming Request - ${req.method}`)
    next()
})

app.route('/')
    .get((req, res) => {
        res.render('home')
    })
    .post((req, res) => {
        res.render('home')
    })