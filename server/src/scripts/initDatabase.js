require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const connectDB = require('../db');

const initDatabase = async () => {
    try {
        // Check if .env exists
        const envPath = path.join(__dirname, '../../.env');
        if (!fs.existsSync(envPath)) {
            console.log('❌ Fichier .env non trouvé');
            console.log('📋 Veuillez d\'abord configurer votre environnement:\n');
            console.log('1️⃣ Copiez le fichier de configuration:');
            console.log('   cp server/env.example server/.env\n');
            console.log('2️⃣ Puis relancez:');
            console.log('   npm run init-db\n');
            return;
        }

        // Connect to MongoDB
        await connectDB();
        
        console.log('🔄 Initialisation de la base de données...');
        
        // Check if users already exist
        const existingUsers = await User.countDocuments();
        if (existingUsers > 0) {
            console.log('✅ Utilisateurs déjà présents dans la base de données');
            console.log(`👥 Nombre d'utilisateurs: ${existingUsers}`);
            return;
        }
        
        // Create default users
        const defaultUsers = [
            {
                fullName: 'Administrateur',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin'
            },
            {
                fullName: 'Utilisateur Test',
                email: 'user@example.com',
                password: 'password123',
                role: 'user'
            }
        ];
        
        // Hash passwords and create users
        for (const userData of defaultUsers) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            const user = new User({
                fullName: userData.fullName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role
            });
            
            await user.save();
            console.log(`✅ Utilisateur créé: ${userData.email} (${userData.role})`);
        }
        
        console.log('\n🎉 Base de données initialisée avec succès !');
        console.log('\n📝 Comptes par défaut:');
        console.log('👤 Admin: admin@example.com / password123');
        console.log('👤 User: user@example.com / password123');
        
        console.log('\n🚀 Prochaines étapes:');
        console.log('1. Démarrez le serveur: npm run dev');
        console.log('2. Ouvrez React: npm run dev (dans un autre terminal)');
        console.log('3. Accédez à: http://localhost:3000');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error.message);
        console.log('\n🔧 Vérifiez votre configuration MongoDB dans .env');
    } finally {
        // Close database connection
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('📪 Connexion à la base de données fermée');
        }
    }
};

// Run the initialization
if (require.main === module) {
    initDatabase();
}

module.exports = initDatabase; 