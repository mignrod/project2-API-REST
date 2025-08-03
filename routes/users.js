const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');
const tasksController = require('../controllers/tasks');
const { isAuthenticate } = require('../middleware/authenticate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', isAuthenticate, usersController.createUser);
router.put('/:id', isAuthenticate, usersController.updateUser);
router.delete('/:id', isAuthenticate, usersController.deleteUser);

router.post('/:id/tasks', isAuthenticate, tasksController.createTask);
router.get('/:id/tasks', tasksController.getAllTasks);
router.get('/:id/tasks/:taskId', tasksController.getTaskById);
router.put('/:id/tasks/:taskId', isAuthenticate, tasksController.updateTask);
router.delete('/:id/tasks/:taskId', isAuthenticate, tasksController.deleteTask);

module.exports = router;
