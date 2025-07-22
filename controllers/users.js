const mongodb = require('../db/database');
// const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
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

module.exports = {
  getAllUsers
};
