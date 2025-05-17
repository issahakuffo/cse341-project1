const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const db = require('../data/database').getDatabase;

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const database = db(); 
    // console.log('Using DB:', database.databaseName); 

    const contacts = await database.collection('contacts').find().toArray();
    // console.log('All contacts:', contacts); 

    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});


// GET one contact by ID via query parameter (?id=...)
// http://localhost:3000/contacts/contact?id=6823a1318c7dfc17346006e8
router.get('/contact', async (req, res) => {
  const id = req.query.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const contact = await db().collection('contacts').findOne({ _id: new ObjectId(id) });

    console.log('Contact by ID:', contact);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve contact' });
  }
});

module.exports = router;
