const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const date = require('date-and-time');

const dbPath = path.join(__dirname, '../data/data.json')

router.get('/', (req, res) => {
    res.render('add', {date: date.format(new Date(), 'YYYY-MM-DD')})
})

router.post('/create-task', (req, res) => {
    fs.readFile(dbPath, (err, data) =>{
        if (err) res.sendStatus(500)

        const tasks = JSON.parse(data)

        tasks.push({
            id:  uniqueID(),
            name: req.body.name,
            description: req.body.description,
            date: ''.concat(req.body.date, ' ', req.body.time)
        })

        tasks.sort((a, b) =>
            date.parse(a.date, 'YYYY-MM-DD HH:mm') - date.parse(b.date, 'YYYY-MM-DD HH:mm')
        )

        fs.writeFile(dbPath, JSON.stringify(tasks), (err) => {
            if (err) res.sendStatus(500)

            res.redirect('/')
        })
    })
})

function uniqueID () {
    return '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = router