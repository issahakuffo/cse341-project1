const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAll = async (req, res) => {
    //#swagger.tags=['users']
    const result = await mongodb.getDatabase().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// Get a single user by ID
const getSingle = async (req, res) => {
    //#swagger.tags=['users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req,res) =>{
    //#swagger.tags=['users']
    const user = {
        frstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColour: req.body.favoriteColour,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('users').inserteOne(user);
    if (response.acknowledge){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.')
    }
};

const updateUser = async (req,res) =>{
    //#swagger.tags=['users']
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.')
    }
};


const deleteUser = async (req,res) =>{
    //#swagger.tags=['users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user.')
    }
};
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};