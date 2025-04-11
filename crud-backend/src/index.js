import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';
import { disconnect } from './services/bookServices.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Closing server...');
    await disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
