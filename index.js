const yargs = require("yargs");
const package = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.version(package.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    // const notes = await getNotes();
    // console.log(notes);
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: { type: "string", describe: "Note id", demandOption: true },
  },
  handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();
