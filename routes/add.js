const express = require('express')
const router = express.Router()
const fs = require('fs')
const date = require('date-and-time');
const DbContext = require("../services/db")

const dbc = new DbContext()
dbc.useCollection("data.json")

router.get('/', (req, res) => {
    res.render('add', {date: date.format(new Date(), 'YYYY-MM-DD')})
})

router.post('/create-task', (req, res) => {
    if (isValid(req.body)) {
        dbc.saveOne(req.body, () => res.render("add", { success: true }))
    } else {
        res.render("add", { error: true, success: false })
    }
})

function  isValid(data) {
    return !(data.name.trim() === "");
}

module.exports = router