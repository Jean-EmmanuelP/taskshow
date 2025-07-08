const { spawn } = require('child_process');
const net = require('net');

const checkMongoDBLocal = () => {
    return new Promise((resolve) => {
        const client = new net.Socket();
        
        client.setTimeout(2000);
        
        client.on('connect', () => {
            client.destroy();
            resolve(true);
        });
        
        client.on('error', () => {
            resolve(false);
        });
        
        client.on('timeout', () => {
            client.destroy();
            resolve(false);
        });
        
        client.connect(27017, '127.0.0.1');
    });
};

const checkMongoDB = async () => {
    console.log('🔍 Vérification de MongoDB...\n');
    
    const isLocalAvailable = await checkMongoDBLocal();
    
    if (isLocalAvailable) {
        console.log('✅ MongoDB local détecté et accessible sur localhost:27017');
        console.log('🎯 Configuration recommandée dans .env:');
        console.log('   MONGO_URI=mongodb://localhost:27017/taskflow\n');
        
        console.log('🚀 Prochaines étapes:');
        console.log('1. Vérifiez votre fichier .env');
        console.log('2. Exécutez: npm run init-db');
        console.log('3. Démarrez: npm run dev\n');
        
        return true;
    } else {
        console.log('❌ MongoDB local non accessible sur localhost:27017\n');
        
        console.log('🔧 Solutions disponibles:\n');
        
        console.log('Option 1: Installer MongoDB local');
        console.log('   npm run install-mongodb\n');
        
        console.log('Option 2: Utiliser MongoDB Atlas (gratuit)');
        console.log('   1. Créez un compte: https://cloud.mongodb.com/');
        console.log('   2. Créez un cluster gratuit');
        console.log('   3. Récupérez votre URI de connexion');
        console.log('   4. Modifiez MONGO_URI dans .env\n');
        
        console.log('Option 3: Utiliser une base de données en mémoire (développement uniquement)');
        console.log('   - Pas de persistance des données');
        console.log('   - Idéal pour les tests rapides\n');
        
        console.log('📋 Commandes utiles:');
        console.log('   npm run install-mongodb  # Instructions d\'installation');
        console.log('   npm run init-db          # Initialiser la base de données');
        console.log('   npm run dev              # Démarrer le serveur\n');
        
        return false;
    }
};

// Run if called directly
if (require.main === module) {
    checkMongoDB().then(isAvailable => {
        if (isAvailable) {
            console.log('🎉 MongoDB prêt à l\'usage !');
        } else {
            console.log('⚠️  MongoDB doit être configuré avant de continuer');
        }
    });
}

module.exports = checkMongoDB; 