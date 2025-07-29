const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const taskSchema = require('../models/task');

const getAllTasks = async (req, res) => {
  // #swagger.tags = ['Tasks']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('tasks')
    .find()
    .toArray();
  if (result.error) {
    res.status(400).json({ message: result.error });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  }
};

const getTaskById = async (req, res) => {
  // #swagger.tags = ['Tasks']
  const taskId = req.params.id;
  if (!ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('tasks')
    .findOne({ _id: new ObjectId(taskId) });
  if (!result) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const createTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: 'Database not connected' });
    }
    const task = await taskSchema.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  const taskId = req.params.id;
  const updatedData = req.body;
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('tasks')
    .updateOne({ _id: new ObjectId(taskId) }, { $set: updatedData });
  if (result.error) {
    res.status(400).json({ message: result.error });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Task updated successfully' });
  }
};

const deleteTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  const taskId = req.params.id;
  if (!ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('tasks')
    .deleteOne({ _id: new ObjectId(taskId) });
  if (result.error) {
    res.status(400).json({ message: result.error });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Task deleted successfully' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
