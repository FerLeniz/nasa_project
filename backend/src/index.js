import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apodRoutes from './routes/apodRoutes.js';
import marsRoutes from './routes/marsRoutes.js';
import errorHandler from './utils/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/apod', apodRoutes);
app.use('/api/mars', marsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});