const notes = require('./notes.js');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
//console.log(process.argv);


yargs.command({
    command:'add',
    describe:'Add a new Note',
    builder:{
        title:{
            describe:"Title for the Note",
            demandOption:true, //makes this option for add command mandatory
            type:'string' //data type of the title option for add command
        },
        body:{
            describe:'The body of the note',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        //console.log(chalk.green.bold(`Adding a new note with title :`) + chalk.red(`${argv.title}`) + chalk.green.bold(` and body : `)+chalk.red(`${argv.body}`));
        notes.addNote(argv.title,argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    builder:{
        title:{
            describe:'Title of the note',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv)
    {
        //console.log(chalk.red.bold('Removing the note'));
        notes.removeNote(argv.title);
    }
});
yargs.command({
    command:'read',
    describe:'Read a Note',
    builder: {
        title:{
            describe:'The title for the Note to find',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        // console.log('Reading a Note');
        notes.readNote(argv.title);
    }
});
yargs.command({
    command:'list',
    describe:'Lists all the Notes',
    handler:function(){
        //console.log('Listing all the Notes');
        notes.listNotes();
    }
});
yargs.parse();
//console.log(yargs.argv);