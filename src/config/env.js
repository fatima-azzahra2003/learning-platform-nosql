// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : 
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : 

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
}
}
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/learning_platform', // Par défaut Mongo local path
    dbName: process.env.MONGODB_DB_NAME || 'learning_platform',
  },
  redis: {
    uri: process.env.REDIS_URI || 'redis://localhost:6379', // Par défaut Redis local path
  },
  port: process.env.PORT || 3000,
};
