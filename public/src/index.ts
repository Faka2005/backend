import express from 'express';
import cors from 'cors';




const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://learning-lumnie.vercel.app/', // Mettez l'URL du frontend
  methods: 'GET, POST',
}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running');
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

app.listen(PORT, () => {
  console.log("Server is running on port ");
});