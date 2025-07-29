const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const userSchema = require('../models/user');

const getAllUsers = async (req, res) => {
  // #swagger.tags = ['Users']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .find()
    .toArray();
  if (result.error) {
    res.status(400).json({ message: result.error });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }
};

const getUserById = async (req, res) => {
  // #swagger.tags = ['Users']
  const userId = req.params.id;
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .findOne({ _id: new ObjectId(userId) });
  if (!result) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: 'Database not connected' });
    }
    const user = await userSchema.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  const userId = req.params.id;
  const updatedData = req.body;
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .updateOne({ _id: new ObjectId(userId) }, { $set: updatedData });
  if (result.error) {
    res.status(400).json({ message: result.error });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'User updated successfully' });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  const userId = req.params.id;
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .deleteOne({ _id: new ObjectId(userId) });
  if (result.error) {
    res.status(400).json({ message: result.error });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'User deleted successfully' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
