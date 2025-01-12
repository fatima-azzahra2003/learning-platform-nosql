// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');
const { db } = require('../config/db');
// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  return db.collection(collection).findOne({ _id: new ObjectId(id) });
}
async function insertOne(collection, data) {
  return db.collection(collection).insertOne(data);
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  insertOne
};

