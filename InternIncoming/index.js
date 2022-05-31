#! /usr/bin/env node

const {program} = require('commander');
const add = require('./features/add')
program
    .requiredOption('-i ,--input ','Use Input')
    .command('add <version> <option>')
    .description('Input the CSV File')
    .action(add)
// program
//     .command('add <version>')
//     .description('Input the CSV File')
//     .action(add)
    
program.parse()