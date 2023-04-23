const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  console.log(notes);

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.blue("Note was add"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("here is the list notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const filtered = notes.filter((note) => note.id !== id);

  await saveNotes(filtered);
  console.log(chalk.red(`Note with id="${id}" has been removed!`));
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
