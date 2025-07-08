require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const User = require("./models/User");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const forgotPassRoutes = require("./routes/forgetPasswordRoute");
const taskRoutes = require('./routes/taskRoutes');
const userLogRoutes = require('./routes/userLogRoutes');
const adminRoutes = require("./routes/admindash");

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes TaskFlow (existantes)
app.use('/api/auth', authRoutes);
app.use("/api/forgot-password", forgotPassRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/logs', userLogRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

// Basic route with API information
app.get("/", (req, res) => {
    res.json({ 
        message: "Bienvenue sur TaskFlow API",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth (POST /login, POST /register)",
            tasks: "/api/tasks (GET, POST, PUT, DELETE)",
            logs: "/api/logs (GET, POST, DELETE)",
            admin: "/api/admin",
            forgotPassword: "/api/forgot-password"
        },
        status: "✅ Serveur en marche"
    });
});

// Test endpoint pour vérifier la connexion MongoDB
app.get("/api/health", async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json({
            status: "✅ Healthy",
            database: "✅ Connected",
            users: userCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: "❌ Error",
            database: "❌ Disconnected",
            error: error.message
        });
    }
});

// Admin user management routes
app.delete("/api/admin/users/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const result = await User.deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        res.status(500).json({ error: "Échec de la suppression de l'utilisateur" });
    }
});

app.put("/api/admin/users/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { fullName, role } = req.body;

        console.log("Mise à jour utilisateur:", { email, fullName, role });

        const user = await User.findOneAndUpdate(
            { email },
            { fullName, role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json(user);
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        res.status(500).json({ error: "Échec de la mise à jour de l'utilisateur" });
    }
});

// Get all users (admin only)
app.get("/api/admin/users", async (req, res) => {
    try {
        const users = await User.find({}, '-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        res.status(500).json({ error: "Échec de la récupération des utilisateurs" });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error("Erreur serveur:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée" });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Serveur TaskFlow démarré sur le port ${PORT}`);
    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    console.log(`🔗 API Documentation: http://localhost:${PORT}/`);
});
  