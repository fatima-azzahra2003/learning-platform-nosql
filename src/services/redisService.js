// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

// Fonctions utilitaires pour Redis
const { redisClient } = require('../config/db');
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
    await redisClient.setEx(key, ttl, JSON.stringify(data));
  }
  
  async function getData(key) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
    getData,
  };
