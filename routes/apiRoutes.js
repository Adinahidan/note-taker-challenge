const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
 fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
   err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
 };

 router.get("/", (req, res) =>{
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => console.log("Error:", err));
});
  
router.post('/', (req, res) => {

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully!`);
  } else {
    res.error('Error in adding note.');
  }
});

router.delete('/:id', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter(note => note.id !== req.params.id)
      res.json(filteredNotes);
      writeToFile("./db/db.json", filteredNotes);
    })
    .catch((err) => console.log("Error:", err));
})

module.exports = router;
