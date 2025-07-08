const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI n\'est pas définie dans le fichier .env');
      console.log('📋 Veuillez copier server/env.example vers server/.env et configurer votre URI MongoDB');
      process.exit(1);
    }

    // Configuration options for MongoDB connection (version moderne, sans options dépréciées)
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10
    };

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log('✅ MongoDB connecté avec succès');
    console.log(`🔗 Base de données: ${mongoose.connection.name}`);
    
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez votre URI MongoDB dans le fichier .env');
    console.log('2. Assurez-vous que MongoDB est accessible');
    console.log('3. Vérifiez votre connexion internet (pour MongoDB Atlas)');
    console.log('4. Whitelist votre IP dans MongoDB Atlas');
    console.log('5. Vérifiez que le nom d\'utilisateur et le mot de passe sont corrects');
    
    // Continue without MongoDB for development
    console.log('\n⚠️  Connexion MongoDB échouée - Mode développement sans MongoDB');
    console.log('✅ Application fonctionne avec localStorage uniquement');
    console.log('🔍 Erreur MongoDB:', err.message);
  }
};

module.exports = connectDB; 