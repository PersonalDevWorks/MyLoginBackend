import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/v1/users',userRoutes);


export default app;
