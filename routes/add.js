const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { render } = require('pug')

const dbPath = path.join(__dirname, '../data/data.json')

router.get('/', (req, res) => {
    res.render('add')
})

router.post('/create-task', (req, res) => {
    fs.readFile(dbPath, (err, data) =>{
        if (err) res.sendStatus(500)

        const tasks = JSON.parse(data)

        tasks.push({
            id:  uniqueID(),
            name: req.body.short_name,
            description: req.body.description
        })

        fs.writeFile(dbPath, JSON.stringify(students), (err) => {
            if (err) res.sendStatus(500)

            res.redirect('/')
        })
    })
})

module.exports = router