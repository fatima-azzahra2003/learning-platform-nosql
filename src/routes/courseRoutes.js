// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : 
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: 

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
router.get('/stats', courseController.getCourseStats);
router.get('/delete', courseController.deletecourse);
// Routes pour les cours
router.get('/:id', courseController.getCourse);

router.post('/', courseController.createCourse);

module.exports = router;
