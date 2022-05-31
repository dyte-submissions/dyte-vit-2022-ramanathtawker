#! /usr/bin/env node

const {program} = require('commander');
const add = require('./features/tempJS')
program
    .command('add <task>')
    .description('Input the CSV File')
    .action(add)
program.parse()