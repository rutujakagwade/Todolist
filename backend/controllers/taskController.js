const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update task (title or completed)
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
