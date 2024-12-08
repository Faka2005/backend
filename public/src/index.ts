import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/mydb';

mongoose.connect(uri, {} as mongoose.ConnectOptions) // Aucune option n'est nécessaire ici
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
