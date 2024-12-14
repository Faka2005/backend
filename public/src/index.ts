import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import multer, { FileFilterCallback } from "multer";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Charger les variables d'environnement
dotenv.config();

// Configurer Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialiser Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Initialiser Express
const app = express();
app.use(express.json());
app.use(helmet()); // Sécuriser les en-têtes HTTP
app.use(morgan("dev")); // Logger les requêtes

// Configurer CORS pour autoriser les requêtes provenant de sources spécifiques
app.use(
  cors({
    origin: ["https://learning-lumnie.vercel.app", ],
    methods: ["GET", "POST"],
  })
);

// Configurer Multer pour gérer les fichiers temporairement en mémoire
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille de fichier : 5 Mo
  fileFilter: (req, file, cb: FileFilterCallback) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(null, false);
    }
    cb(null, true);
  },
});

// Fonction utilitaire pour uploader un fichier vers Firebase Storage
const uploadFileToFirebase = async (file: Express.Multer.File, folder: string): Promise<string> => {
  const fileRef = ref(storage, `${folder}/${Date.now()}-${file.originalname}`);
  const snapshot = await uploadBytes(fileRef, file.buffer, {
    contentType: file.mimetype,
  });
  return getDownloadURL(snapshot.ref);
};

// Swagger Documentation
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Learning API",
      version: "1.0.0",
      description: "API pour gérer les cours, exercices et outils",
    },
  },
  apis: ["./index.ts"], // Chemin vers ce fichier
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Accueil de l'API
 *     responses:
 *       200:
 *         description: Retourne un message de bienvenue.
 */
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupérer la liste des cours
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         description: Numéro de la page
 *       - in: query
 *         name: limit
 *         type: integer
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste des cours
 */
app.get("/courses", (req: Request, res: Response) => {
  const courses = [
    { id: 1, theme: "frontend", title: "React Basics", description: "Learn the fundamentals of React." },
    { id: 2, theme: "frontend", title: "TypeScript for Beginners", description: "Understand TypeScript essentials." },
    { id: 3, theme: "backend", title: "Node.js Essentials", description: "Master the basics of Node.js." },
    { id: 4, theme: "mathématique", title: "Nombre Complexe", description: "Apprendre les nombres complexes." },
    { id: 5, theme: "Physique", title: "Amplificateur opérationnel", description: "" },
  ];

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = courses.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: courses.length,
    results,
  });
});

/**
 * @swagger
 * /exercice/fichier/upload:
 *   post:
 *     summary: Uploader un fichier d'exercice
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: Fichier à uploader
 *     responses:
 *       200:
 *         description: Fichier uploadé avec succès
 */
app.post(
  "/exercice/fichier/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "Aucun fichier fourni." });
        return; // Fin de la fonction
      }

      const downloadURL = await uploadFileToFirebase(req.file, "exercices");
      res.status(200).json({ message: "Fichier uploadé avec succès", url: downloadURL });
    } catch (error) {
      const err = error as Error; // Cast explicite pour error
      if (err.message === "Type de fichier non supporté") {
        res.status(400).json({ message: err.message });
        return;
      }
      console.error("Erreur lors de l'upload :", err.message);
      res.status(500).json({ message: "Erreur lors de l'upload du fichier" });
    }
  }
);


// Middleware de gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur interne est survenue." });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
