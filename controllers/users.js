const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if(response.acnowledged) {
       res.status(200).send();
    }else {
        res.status(500).send(response.error || "Some error occurred while creating the user.");
    }	
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = ObjectId.createFromHexString(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if(response.modifiedCount > 0) {
       res.status(200).send();
    }else {
        res.status(500).send(response.error || "Some error occurred while updating the user.");
    }	
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if(response.deletedCount > 0) {
       res.status(200).send();
    }else {
        res.status(500).send(response.error || "Some error occurred while deleting the user.");
    }	
};


module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};