const express = require('express')
const router = express.Router()
const fs = require('fs')
const DbContext = require("../services/db")



const dbc = new DbContext()
dbc.useCollection("data.json")


router.get('/', (req, res) => {
    dbc.getAll(
        records => res.render("tasks", { value: records }),
        () => res.render("tasks", { value: null })
    )
})

// Opens a single task by id
router.get('/:id', (req, res) => {
     dbc.getOne(
        req.params.id,
        record => res.render("a_task", { value: record }),
        () => res.sendStatus(404)
    )
})

// This adds, edits and deletes tasks
router.get('/:id/delete', (req, res) => {

    dbc.deleteOne(
        req.params.id,
        () => res.redirect('/tasks'),
        () => res.sendStatus(500)
    )
})

router.post('/:id/putOff', (req, res) => {

    dbc.putOff(
        req.params.id,
        req.body,
        record => res.render("a_task", { value: record }),
        () => res.sendStatus(500))

})

module.exports = router