const fs = require('fs');
const path = require('path');

const quickStart = () => {
    console.log('🚀 TaskFlow - Configuration Express\n');
    
    const envExamplePath = path.join(__dirname, '../../env.example');
    const envPath = path.join(__dirname, '../../.env');
    
    // Check if .env exists
    if (fs.existsSync(envPath)) {
        console.log('✅ Fichier .env trouvé');
        console.log('🔄 Tentative de connexion à MongoDB...\n');
        return;
    }
    
    console.log('❌ Fichier .env non trouvé');
    console.log('📋 Étapes de configuration:\n');
    
    console.log('1️⃣ Copiez le fichier de configuration:');
    console.log('   cp server/env.example server/.env\n');
    
    console.log('2️⃣ Le fichier contient déjà une URI MongoDB de test qui fonctionne');
    console.log('   (vous pouvez l\'utiliser directement pour les tests)\n');
    
    console.log('3️⃣ Initialisez la base de données:');
    console.log('   npm run init-db\n');
    
    console.log('4️⃣ Démarrez le serveur:');
    console.log('   npm run dev\n');
    
    console.log('⚠️  Pour la production, créez votre propre MongoDB Atlas:');
    console.log('   https://cloud.mongodb.com/\n');
    
    console.log('🚀 Commande complète:');
    console.log('   cp server/env.example server/.env && npm run init-db && npm run dev');
};

// Run if called directly
if (require.main === module) {
    quickStart();
}

module.exports = quickStart; 