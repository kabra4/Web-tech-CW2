const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

app.use(express.static('public'))

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended : false }))

const dbPath = path.join(__dirname, 'data/data.json')



app.listen(3000, (err) => {
    if (err) throw err

    console.log("Server is running on 3k")
})

app.get('/', (req, res) => {
    res.render('home')
})