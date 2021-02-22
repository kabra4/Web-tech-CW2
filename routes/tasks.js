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

router.get('/:id', (req, res) => {
    const id = req.params.id

    fs.readFile(dbPath, (err, data) =>{
        if (err) res.sendStatus(500)

        const tasks = JSON.parse(data)

        const task = tasks.filter(val => val.id == id)[0]

        res.render('a_task', { value: task })
    })
})

router.post('/:id/:action', (req, res) => {
    const id = req.params.id
    const action = req.params.action

    fs.readFile(dbPath, (err, data) =>{
        if (err) res.sendStatus(500)

        const tasks = JSON.parse(data)
        const taskId = findId(tasks, id)

        switch (action){
            case 'putOff':
                let taskDate = date.parse(tasks[taskId]['date'], 'YYYY-MM-DD HH:mm')
                taskDate = date.addDays(taskDate, req.body.days)
                taskDate = date.addHours(taskDate, req.body.hours)
                tasks[taskId]['date'] = date.format(taskDate, 'YYYY-MM-DD HH:mm')
                break

            case 'edit':
                let updated = {
                    id:  taskId,
                    name: req.body.name,
                    description: req.body.description,
                    date: ''.concat(req.body.date, ' ', req.body.time)
                }
                tasks[taskId] = updated;
                break

            case 'delete':
                tasks.splice(taskId, 1)
                break
        }

        tasks.sort((a, b) =>
            date.parse(a.date, 'YYYY-MM-DD HH:mm') - date.parse(b.date, 'YYYY-MM-DD HH:mm')
        )

        fs.writeFile(dbPath, JSON.stringify(tasks), (err) => {
            if (err) res.sendStatus(500)

            res.redirect('/tasks')
        })
    })
})

function findId(array, id) {
    for (i = 0; i < array.length; i++){
        if (array[i]["id"] == id){
            return i;
        }
    }
}

module.exports = router