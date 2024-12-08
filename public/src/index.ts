import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Course, Exercice, Outil, User } from './models';

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'], // Remplacez par l'URL de votre frontend en production
  methods: ['GET', 'POST'],
}));

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/learning_db',)
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Routes

// Récupérer tous les cours
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des cours');
  }
});

// Récupérer tous les exercices
app.get('/exercice', async (req, res) => {
  try {
    const exercices = await Exercice.find();
    res.json(exercices);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des exercices');
  }
});

// Récupérer tous les outils
app.get('/outils', async (req, res) => {
  try {
    const outils = await Outil.find();
    res.json(outils);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des outils');
  }
});

// Récupérer tous les utilisateurs
app.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
