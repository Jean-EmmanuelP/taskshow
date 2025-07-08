const fs = require('fs');
const path = require('path');

const setup = () => {
    console.log('🚀 Configuration initiale de TaskFlow...\n');
    
    // Path to env files
    const envExamplePath = path.join(__dirname, '../../env.example');
    const envPath = path.join(__dirname, '../../.env');
    
    // Check if .env already exists
    if (fs.existsSync(envPath)) {
        console.log('✅ Le fichier .env existe déjà');
        return;
    }
    
    // Copy env.example to .env
    try {
        const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
        
        // Create .env with working MongoDB Atlas URI for testing
        const envContent = `# MongoDB Configuration - URI de test pour démarrage rapide
MONGO_URI=mongodb+srv://taskflow-test:taskflow123@cluster0.mongodb.net/taskflow?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=taskflow-super-secret-jwt-key-2024

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (optionnel)
EMAIL_USER=test@example.com
EMAIL_PASS=test-password

# ⚠️ IMPORTANT: Pour la production, utilisez votre propre URI MongoDB
# 1. Créez votre compte MongoDB Atlas: https://cloud.mongodb.com/
# 2. Créez un cluster gratuit
# 3. Remplacez MONGO_URI par votre URI personnelle
# 4. Changez JWT_SECRET pour une clé sécurisée`;
        
        fs.writeFileSync(envPath, envContent);
        console.log('✅ Fichier .env créé avec succès');
        console.log('🔗 URI MongoDB de test configurée automatiquement');
        console.log('\n📋 Prochaines étapes:');
        console.log('1. Exécutez: npm run init-db');
        console.log('2. Démarrez le serveur: npm run dev');
        console.log('\n⚠️ Pour la production, configurez votre propre MongoDB Atlas');
        
    } catch (error) {
        console.error('❌ Erreur lors de la création du fichier .env:', error.message);
        console.log('\n🔧 Solution manuelle:');
        console.log('1. Copiez server/env.example vers server/.env');
        console.log('2. Modifiez les variables selon vos besoins');
    }
};

// Run setup if called directly
if (require.main === module) {
    setup();
}

module.exports = setup; 