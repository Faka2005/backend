import mongoose from 'mongoose';
import { Course, Exercice, Outil, User } from './models';

mongoose.connect('mongodb://localhost:27017/learning_db')
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB :', err));

async function seedData() {
  await Course.insertMany([
    { theme: 'frontend', title: 'React Basics', description: 'Learn the fundamentals of React.' },
    { theme: 'frontend', title: 'TypeScript for Beginners', description: 'Understand TypeScript essentials.' },
    { theme: 'backend', title: 'Node.js Essentials', description: 'Master the basics of Node.js.' },
    { theme: 'mathématique', title: 'Nombre Complexe', description: 'Apprendre les nombres complexes.' },
  ]);

  await Exercice.insertMany([
    { title_execice: 'Nombre Complexe', niveau: 1 },
    { title_execice: 'Nombre Complexe', niveau: 2 },
    { title_execice: 'Nombre Complexe', niveau: 3 },
    { title_execice: 'Nombre Complexe', niveau: 4 },
    { title_execice: 'Nombre Complexe', niveau: 5 },
  ]);

  await Outil.insertMany([
    { title: 'Fusionneur', description: 'Fusionner plusieurs fichiers pdf' },
    { title: 'Compresser', description: 'Compresser fichier' },
    { title: 'Convertisseur de fichier', description: 'Convertir des formats de documents' },
  ]);

  await User.insertMany([
    { name: 'admin', password: 'admin', status: 'administrateur' },
  ]);

  console.log('Données insérées avec succès');
  mongoose.connection.close();
}

seedData();
