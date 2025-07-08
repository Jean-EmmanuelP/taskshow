const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Get all tasks for a user
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Create a new task
router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        
        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            userId: req.user.userId
        });
        
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update a task
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, progress } = req.body;
        
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { title, description, status, priority, dueDate, progress },
            { new: true }
        );
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get tasks with filters
router.get('/filter', verifyToken, async (req, res) => {
    try {
        const { status, priority, search } = req.query;
        let filter = { userId: req.user.userId };
        
        if (status && status !== 'all') {
            filter.status = status;
        }
        
        if (priority && priority !== 'all') {
            filter.priority = priority;
        }
        
        let tasks = await Task.find(filter).sort({ createdAt: -1 });
        
        if (search) {
            tasks = tasks.filter(task => 
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router; 