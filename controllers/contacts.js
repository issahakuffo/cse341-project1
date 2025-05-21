 const mongodb = require('../data/database');
 const ObjectId = require('mongodb').ObjectId;
 
 // Get all users
 const getAll = async (req, res) => {
     //#swagger.tags = ['contacts']
     const result = await mongodb.getDatabase().collection('contacts').find();
     result.toArray().then((contacts) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(contacts);
     });
 };
 
 // Get a single contact by ID
 const getSingle = async (req, res) => {
    //#swagger.tags = ['contacts']
     const contactId = new ObjectId(req.params.id);
     const result = await mongodb.getDatabase().collection('contacts').find({ _id: contactId });
     result.toArray().then((contacts) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(contacts[0]);
     });
 };
 
 const createContact = async (req,res) =>{
    //#swagger.tags = ['contacts']
     const contact = {
         frstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         favoriteColour: req.body.favoriteColour,
         birthday: req.body.birthday
     };
     const response = await mongodb.getDatabase().collection('contacts').inserteOne(contact);
     if (response.acknowledge){
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while updating the contact.')
     }
 };
 
 const updateContact = async (req,res) =>{
    //#swagger.tags = ['contacts']
     const contactId = new ObjectId(req.params.id);
     const contact = {
         username: req.body.username,
         email: req.body.email,
         name: req.body.name,
         ipaddress: req.body.ipaddress
     };
     const response = await mongodb.getDatabase().collection('contacts').replaceOne({ _id: contactId }, contact);
     if (response.modifiedCount > 0){
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while updating the contact.')
     }
 };
 
 
 const deleteContact = async (req,res) =>{
    //#swagger.tags = ['contacts']
     const contactId = new ObjectId(req.params.id);
     const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
     if (response.deletedCount > 0){
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while deleting the contact.')
     }
 };
 
 module.exports = {
     getAll,
     getSingle,
     createContact,
     updateContact,
     deleteContact
 }; 