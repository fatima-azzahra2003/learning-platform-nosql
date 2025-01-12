// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env');
const { connectMongo, connectRedis, closeConnections } = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');


const app = express();
app.use(express.json());
app.use('/courses', courseRoutes);
async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    // TODO: Configurer les middlewares Express
    // TODO: Monter les routes
    // TODO: Démarrer le serveur
    await db.connectMongo();
    await db.connectRedis();
  
    app.use(express.json());
    app.use('/api/courses', courseRoutes);
  
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  console.log('Shutting down server...');
  await closeConnections();
  process.exit(0);
});

startServer();
