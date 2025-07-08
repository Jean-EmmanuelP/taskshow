const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ 
            message: 'Token d\'accès requis' 
        });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                message: 'Token invalide ou expiré' 
            });
        }
        
        req.user = user;
        next();
    });
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ 
            message: 'Accès refusé. Droits administrateur requis.' 
        });
    }
    next();
};

// Middleware to check if user exists in database
const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'Utilisateur non trouvé' 
            });
        }
        req.dbUser = user;
        next();
    } catch (error) {
        return res.status(500).json({ 
            message: 'Erreur serveur lors de la vérification utilisateur' 
        });
    }
};

// Middleware to log user activity
const logUserActivity = (action) => {
    return (req, res, next) => {
        // Store activity info in request for later use
        req.userActivity = {
            action,
            timestamp: new Date(),
            ipAddress: req.ip || req.connection.remoteAddress || '127.0.0.1'
        };
        next();
    };
};

module.exports = {
    authenticateToken,
    requireAdmin,
    verifyUser,
    logUserActivity
}; 