#! /usr/bin/env node

const {program} = require('commander');
const add = require('./features/add')
program
    .command('add <task>')
    .description('Input the CSV File')
    .action(add)
program.parse()