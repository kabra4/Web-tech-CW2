const fs = require("fs");
const path = require("path");
const date = require('date-and-time');

const generateID = require("../utils").generateID;
const root = require("../utils").root;

class DbContext {
  constructor() {
    this.collection = null;
  }

  useCollection(collection = "") {
    this.collection = path.join(root, `database/${collection}`);
    console.log(this.collection)
  }
  
  getOne(id, successCb, errorCb) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorCb();

      const records = JSON.parse(data);
      const record = records.filter(record => record.id === id)[0]
      successCb(record);
    });
  }

  getAll(successCb, errorCb) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorCb();

      const records = JSON.parse(data);
      successCb(records);
    });
  }

  saveOne(newRecord, successCb, errorCb) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorCb();

      const tasks = JSON.parse(data)

      tasks.push({
        id:  generateID(),
        name: newRecord.name,
        description: newRecord.description,
        date: ''.concat(newRecord.date, ' ', newRecord.time)
      })

      tasks.sort((a, b) =>
          date.parse(a.date, 'YYYY-MM-DD HH:mm') - date.parse(b.date, 'YYYY-MM-DD HH:mm')
      )

      fs.writeFile(this.collection, JSON.stringify(tasks), err => {
        if (err) errorCb();
        successCb();
      });
    });
  }

  deleteOne(id, successCb, errorCb) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorCb();

      const records = JSON.parse(data);

      const filtered = records.filter(record => record.id != id) || [];

      fs.writeFile(this.collection, JSON.stringify(filtered), err => {
        if (err) errorCb();
        successCb();
      });
    });
  }

  putOff(id, newRecord, successCb, errorCb) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorCb();

      const tasks = JSON.parse(data);

      let taskId;
      for (let i = 0; i < tasks.length; i++){
        if (tasks[i]["id"] === id){
          taskId = i;
          break
        }
      }
      // Adding days and hours to task time
      let taskDate = date.parse(tasks[taskId]['date'], 'YYYY-MM-DD HH:mm')
      taskDate = date.addDays(taskDate, parseInt(newRecord.days))
      taskDate = date.addHours(taskDate, parseInt(newRecord.hours))
      tasks[taskId]['date'] = date.format(taskDate, 'YYYY-MM-DD HH:mm')

      tasks.sort((a, b) =>
          date.parse(a.date, 'YYYY-MM-DD HH:mm') - date.parse(b.date, 'YYYY-MM-DD HH:mm')
      )

      fs.writeFile(this.collection, JSON.stringify(tasks), err => {
        if (err) errorCb();
        successCb(tasks[taskId]);
      });
    });
  }
}

module.exports = DbContext;
