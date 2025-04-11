import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', bookRoutes);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

