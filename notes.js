const fs = require('fs');
const chalk = require('chalk');

const getNotes = function ()
{
    return "Your Notes";
}
const addNote = function (title,body){
    var retrievedData = loadNotes();
    
    duplicateTitle = retrievedData.filter(function(note){
        return (note.title===title);
    })
    if(duplicateTitle.length===0)
    {
        const noteToAdd = {
            title:title,
            body:body
        };
        retrievedData.push(noteToAdd);
        saveNotes(retrievedData);
        console.log(chalk.green.inverse('Note Added Successfully'));
    }
    else{
        console.log(chalk.red.inverse('Note title already taken. Try with a different title'));
    }
}
const removeNote = function(title){
    var retrievedData = loadNotes();
    const initialRecord = retrievedData.length;
    retrievedData = retrievedData.filter((note)=>(note.title!==title));
    saveNotes(retrievedData);
    if(initialRecord!== retrievedData.length)
    {
        console.log(chalk.red.inverse("Note Removed"));
    }
    else{
        console.log(`Note with title : ${chalk.red(title)} doesn't exist!`);
    }
}
const listNotes = function(){
    var retrievedData = loadNotes();
    if(retrievedData.length!==0)
    {
        retrievedData.forEach((note)=>{
            console.log(`${chalk.bold(note.title)} : ${note.body}`);
        });
    }
    else {
        console.log("No Note Present");
    }
    
}
const readNote = function(title){
    const retrievedData = loadNotes();
    const Note = retrievedData.find((note)=>note.title===title);
    if(Note!==undefined)
    {
        console.log(`${chalk.red.bold(Note.title)} : ${chalk.bold(Note.body)}`)
    }
    else
    {
        console.log('Note doesn\'t exist');
    }
}
function loadNotes()
{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        const parsedData = JSON.parse(dataJSON);
        return parsedData;
    }catch(e)
    {
        return [];
    }
}
function saveNotes(data)
{
    fs.writeFileSync('notes.json',JSON.stringify(data));
}
module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}