// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');


async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const db = getDb();
    if (!db) {
      console.error('MongoDB connection not established');
      return res.status(500).json({ error: 'MongoDB connection not established' });
    }

    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    console.log('Inserting course with title:', title, 'and description:', description);
    const result = await db.collection('courses').insertOne({ title, description });
    console.log('Course inserted:', result);

    const insertedCourse = await db.collection('courses').findOne({ _id: result.insertedId });
    console.log('Inserted Course:', insertedCourse); // Log the inserted course

    res.status(201).json(insertedCourse);
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ error: 'Failed to create course' });
  }
}
//Méthode qui retourne les détails d'une course grace a son id
async function getCourse(req, res) {
  try {
    const db = getDb();
    const { id } = req.params;
    console.log('Fetching course with id:', id);
    const course = await db.collection('courses').findOne({ _id: new ObjectId(id) });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
}

//Méthode qui retourne les statistiques des courses
async function getCourseStats(req, res) {
  try {
    const db = getDb();
    const coursesCount = await db.collection('courses').countDocuments();
    res.status(200).json({ coursesCount });
  } catch (err) {
    console.error('Error fetching course stats:', err);
    res.status(500).json({ error: 'Failed to fetch course stats' });
  }
}

async function deletecourse(req, res) {
  try {
    const db = getDb();
    const { id } = req.params;
    console.log('Fetching course with id:', id);
    const course = await db.collection('courses').deleteOne({ _id: new ObjectId(id) });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats,
  deletecourse,
};
