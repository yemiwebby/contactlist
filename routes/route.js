const express = require('express');
const router = express.Router();


const Contact = require('../models/contacts');

//Retrieving contacts to the application
router.get('/contacts', (req, res, next) => {
  Contact.find((err, contacts) => {
    res.json(contacts);
  })
})

//Adding contact to the application
router.post('/contact', (req, res, next) => {
// logic to add contact
let newContact = new Contact({
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  phone: req.body.phone
});

//save to the database
newContact.save((err, contact) => {
  if(err){
    res.json({
      msg: 'Failed to add contact'
    });
  }else {
    res.json({
      msg: 'Contact added successfully'
    });
  }
})
console.log('Contact has just been added successfully')
});

//Deleting contact
router.delete('/contact/:id', (req, res, next) => {
  Contact.remove({_id: req.params.id}, (err, result) => {
    if(err){
      res.json(err);
    }else {
      res.json(result);
    }
  })
  console.log('Contact has been deleted successfully')
});

 module.exports = router;
