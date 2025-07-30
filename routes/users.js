const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');
const tasksController = require('../controllers/tasks');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

router.post('/users/:id/tasks', tasksController.createTask);
router.get('/users/:id/tasks', tasksController.getAllTasks);
router.get('/users/:id/tasks/:taskId', tasksController.getTaskById);
router.put('/users/:id/tasks/:taskId', tasksController.updateTask);
router.delete('/users/:id/tasks/:taskId', tasksController.deleteTask);

module.exports = router;
