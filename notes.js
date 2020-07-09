const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title,
            body
        });

        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const noteIndex = notes.findIndex(note => note.title === title);

    if (noteIndex === -1)
        return console.log(chalk.red.inverse(`No note found with title: "${title}"`));

    notes.splice(noteIndex, 1);
    saveNotes(notes);
    console.log(chalk.green.inverse('Note removed!'));
};

const listNotes = () => {
    const notes = loadNotes();

    if (notes === [])
        return console.log(chalk.red.inverse('There are no notes'));

    console.log(chalk.bold('Your notes:'));
    notes.forEach(note => console.log(chalk.blue(note.title)));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (!note)
        return console.log(chalk.red.inverse('Note not found'));

    console.log(chalk.inverse(note.title));
    console.log(note.body);
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        return JSON.parse(dataBuffer);
    } catch(e) {
        return [];
    }
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}