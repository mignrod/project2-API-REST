const User = require('../models/user');

const getAllUsers = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const { name, email, password, nickname, age } = req.body;
    if (!name || !email || !password || !nickname) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newUser = new User({
      name,
      email,
      password,
      nickname,
      age
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const { id } = req.params;
    const { name, email, password, nickname, age } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        nickname,
        age
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
