// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    mongoClient = new MongoClient(config.mongodb.uri, { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log("MongoDB connected successfully");
} catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
}
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  redisClient = redis.createClient({ url: config.redis.uri });
  redisClient.on('error', (err) => {
      console.error("Redis connection error:", err);
  });
  await redisClient.connect();
  console.log("Redis connected successfully");
}
async function closeConnections() {
  if (mongoClient) await mongoClient.close();
  if (redisClient) await redisClient.quit();
  console.log("Connections closed successfully");
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles

    connectMongo,
    connectRedis,
    closeConnections,
    db,
    redisClient
};
