import mongoose from 'mongoose';

// Modèle pour les cours
const courseSchema = new mongoose.Schema({
  theme: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
export const Course = mongoose.model('Course', courseSchema);

// Modèle pour les exercices
const exerciceSchema = new mongoose.Schema({
  title_execice: { type: String, required: true },
  niveau: { type: Number, required: true },
});
export const Exercice = mongoose.model('Exercice', exerciceSchema);

// Modèle pour les outils
const outilSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
export const Outil = mongoose.model('Outil', outilSchema);

// Modèle pour les utilisateurs
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
});
export const User = mongoose.model('User', userSchema);
