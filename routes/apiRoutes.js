const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const dbPath = path.join(__dirname, '../db/db.json');

router.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(dbPath));
  res.json(notes);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  const notes = JSON.parse(fs.readFileSync(dbPath));
  notes.push(newNote);

  fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));

  res.json(newNote);
});

module.exports = router;
