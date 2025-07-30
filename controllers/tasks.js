const Task = require('../models/task');

const createTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const { title, description, status, dueDate, priority, createdBy, userId } =
      req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }
    const newTask = new Task({
      title,
      description,
      status: status || 'pending',
      dueDate,
      priority: priority || 'medium',
      createdBy: createdBy || req.params.id,
      userId: userId || req.params.id
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const tasks = await Task.find({ userId: req.params.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const { title, description, status, dueDate, priority } = req.body;

    // Validar el status según el enum del schema
    const allowedStatus = ['pending', 'in-progress', 'completed'];
    if (status && !allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({
          message:
            'Invalid status value. Allowed values are: pending, in-progress, completed.'
        });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title,
        description,
        status,
        dueDate,
        priority
      },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
