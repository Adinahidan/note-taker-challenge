const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes.' });
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

router.post('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes.' });
    } else {
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = uuidv4();
      notes.push(newNote);

      fs.writeFile(
        path.join(__dirname, '../db.json'),
        JSON.stringify(notes, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to save note.' });
          } else {
            res.json(newNote);
          }
        }
      );
    }
  });
});

module.exports = router;
