const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const listTasks = require('./routes/tasks')
const addNew = require('./routes/add')

app.use(express.static('public'))

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended : false }))

// app.use
app.use('/tasks', listTasks)
app.use('/add', addNew)

var port = process.env.PORT || 8080;

app.listen(port, (err) => {
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