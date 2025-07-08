const express = require('express');
const UserLog = require('../models/UserLog');
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

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
};

// Get all user logs (admin only)
router.get('/', verifyToken, adminOnly, async (req, res) => {
    try {
        const logs = await UserLog.find()
            .populate('userId', 'fullName email')
            .sort({ createdAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Create a new log entry
router.post('/', verifyToken, async (req, res) => {
    try {
        const { action, ipAddress, tokenName } = req.body;
        
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const logData = {
            userId: req.user.userId,
            username: user.email,
            role: user.role,
            action,
            ipAddress,
            tokenName
        };
        
        if (action === 'login') {
            logData.loginTime = new Date();
        } else if (action === 'logout') {
            logData.logoutTime = new Date();
        }
        
        const log = new UserLog(logData);
        await log.save();
        
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a log entry (admin only)
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
    try {
        const log = await UserLog.findByIdAndDelete(req.params.id);
        
        if (!log) {
            return res.status(404).json({ message: 'Log entry not found' });
        }
        
        res.json({ message: 'Log entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get logs with filters (admin only)
router.get('/filter', verifyToken, adminOnly, async (req, res) => {
    try {
        const { role, search, action } = req.query;
        let filter = {};
        
        if (role && role !== 'all') {
            filter.role = role;
        }
        
        if (action && action !== 'all') {
            filter.action = action;
        }
        
        let logs = await UserLog.find(filter)
            .populate('userId', 'fullName email')
            .sort({ createdAt: -1 });
        
        if (search) {
            logs = logs.filter(log => 
                log.username.toLowerCase().includes(search.toLowerCase()) ||
                log.ipAddress.includes(search)
            );
        }
        
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router; 