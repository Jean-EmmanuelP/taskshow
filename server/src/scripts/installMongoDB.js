const { spawn } = require('child_process');
const os = require('os');

const installMongoDB = () => {
    console.log('🗄️  Installation de MongoDB local\n');
    
    const platform = os.platform();
    
    console.log(`🖥️  Système détecté: ${platform}\n`);
    
    switch (platform) {
        case 'darwin': // macOS
            console.log('🍎 Installation sur macOS:');
            console.log('1. Installer Homebrew (si pas déjà fait):');
            console.log('   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n');
            
            console.log('2. Installer MongoDB:');
            console.log('   brew tap mongodb/brew');
            console.log('   brew install mongodb-community\n');
            
            console.log('3. Démarrer MongoDB:');
            console.log('   brew services start mongodb/brew/mongodb-community\n');
            
            console.log('4. Vérifier le statut:');
            console.log('   brew services list | grep mongodb\n');
            break;
            
        case 'win32': // Windows
            console.log('🪟 Installation sur Windows:');
            console.log('1. Téléchargez MongoDB Community Server:');
            console.log('   https://www.mongodb.com/try/download/community\n');
            
            console.log('2. Exécutez l\'installateur .msi');
            console.log('3. Suivez les instructions d\'installation\n');
            
            console.log('4. Démarrez MongoDB:');
            console.log('   - Utilisez MongoDB Compass (interface graphique)');
            console.log('   - Ou démarrez mongod.exe manuellement\n');
            break;
            
        case 'linux': // Linux
            console.log('🐧 Installation sur Linux (Ubuntu/Debian):');
            console.log('1. Mise à jour des paquets:');
            console.log('   sudo apt-get update\n');
            
            console.log('2. Installation MongoDB:');
            console.log('   sudo apt-get install -y mongodb\n');
            
            console.log('3. Démarrer MongoDB:');
            console.log('   sudo systemctl start mongodb');
            console.log('   sudo systemctl enable mongodb\n');
            
            console.log('4. Vérifier le statut:');
            console.log('   sudo systemctl status mongodb\n');
            break;
            
        default:
            console.log('❓ Système non reconnu. Consultez la documentation MongoDB:');
            console.log('   https://docs.mongodb.com/manual/installation/\n');
    }
    
    console.log('📋 Après installation:');
    console.log('1. Copiez le fichier de configuration:');
    console.log('   cp server/env.example server/.env\n');
    
    console.log('2. Vérifiez que MONGO_URI pointe vers localhost:');
    console.log('   MONGO_URI=mongodb://localhost:27017/taskflow\n');
    
    console.log('3. Initialisez la base de données:');
    console.log('   npm run init-db\n');
    
    console.log('4. Démarrez le serveur:');
    console.log('   npm run dev\n');
    
    console.log('🆘 Besoin d\'aide? Consultez:');
    console.log('- Documentation MongoDB: https://docs.mongodb.com/');
    console.log('- MongoDB Atlas (gratuit): https://cloud.mongodb.com/');
    console.log('- Guide TaskFlow: QUICK_START.md');
};

// Run if called directly
if (require.main === module) {
    installMongoDB();
}

module.exports = installMongoDB; 