const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');
const tasksController = require('../controllers/tasks');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

router.post('/:id/tasks', tasksController.createTask);
router.get('/:id/tasks', tasksController.getAllTasks);
router.get('/:id/tasks/:taskId', tasksController.getTaskById);
router.put('/tasks/:taskId', tasksController.updateTask);
router.delete('/tasks/:taskId', tasksController.deleteTask);

module.exports = router;
