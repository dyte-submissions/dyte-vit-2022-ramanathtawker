const conf = new (require('conf'))()

const fs = require("fs");
const { parse } = require("csv-parse");

function add (task) {
    fs.createReadStream('./sampleInput.csv')
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row) => {
        console.log(row);
        })

    // let todosList = conf.get('todo-list')

    // if (!todosList) {
    //     //default value for todos-list
    //     todosList = []
    // }

    // //push the new task to the todos-list
    // todosList.push({
    //     text: task,
    //     done: false
    // })

    // //set todos-list in conf
    // conf.set('todo-list', todosList)

    // //display message to user
    // console.log(
    //    'Task has been added successfully!')
}

module.exports = add