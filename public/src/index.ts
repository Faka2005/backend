import express from 'express';
import cors from 'cors';
import path from 'path';



const app = express();

app.use(express.json());
app.use(cors({
  origin: ['https://learning-lumnie.vercel.app', 'null'], 
  methods: ['GET', 'POST'],
}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(path.join( 'index.html')); // Chemin vers index.html
});

app.get('/courses', (req, res) => {
  const courses = [
    { id: 1, theme: 'frontend', title: 'React Basics', description: 'Learn the fundamentals of React.' },
    { id: 2, theme: 'frontend', title: 'TypeScript for Beginners', description: 'Understand TypeScript essentials.' },
    { id: 3, theme: 'backend', title: 'Node.js Essentials', description: 'Master the basics of Node.js.' },
    { id: 4, theme: 'mathématique', title: 'Nombre Complexe', description: 'Apprendre les nombres complexes.' }
  ];
  res.json(courses);
});
app.get('/exercice', (req, res)=> {
  const exercice = [
    { id: 1, title_execice: 'Nombre Complexe',niveau:1 },
    { id: 2, title_execice: 'Nombre Complexe',niveau:2 },
    { id: 3, title_execice: 'Nombre Complexe',niveau:3 },
    { id: 4, title_execice: 'Nombre Complexe',niveau:4 },
    { id: 5, title_execice: 'Nombre Complexe',niveau:5 },
  ];
  res.json(exercice);
});

app.get('/outils',(req,res)=>{
  const outils = [
    { id: 1, title: 'Fusionneur', description: 'Fusionner plusieurs fichier pdf'},
    { id: 2, title: 'Compresser', description: 'Compresser fichier'},
    { id: 3, title: 'Convertisseur de fichier', description: 'Convertir des formats de documents'},
    { id: 4, title: 'Analyseur', description: 'Analyser un texte'},
    { id: 5, title: 'Editeur', description: 'Editer un texte'},
    { id: 6, title: "Convertisseur d'unité", description: 'Convertir des unités'}
  ];res.json(outils);
});

app.listen(PORT, () => {
  console.log("Server is running on port ");
});