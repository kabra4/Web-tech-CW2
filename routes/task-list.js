const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


const dbPath = path.join(__dirname, '../data/data.json')


router.get('/', (req, res) => {
    fs.readFile(dbPath, (err, data) =>{
        if (err) res.sendStatus(500)
        const tasks = JSON.parse(data)

        res.render('tasks', { value: tasks})
    })
})


module.exports = router