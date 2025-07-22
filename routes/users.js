const express = require('express');

const router = express.Router();

const tasksController = require('../controllers/users');

router.get('/', tasksController.getAllUsers);
// router.post('/', tasksController.createTask);
// router.get('/:id', tasksController.getTaskById);
// router.put('/:id', tasksController.updateTask);
// router.delete('/:id', tasksController.deleteTask);

module.exports = router;
