import express, { Request, Response } from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
const port = 8080;

// Define a route for GET requests to the root URL
app.get('/', (req : Request, res : Response) => {
  res.send('Hello World from Express!');
});

app.post('/api/register', (req : Request, res : Response) => {
  res.json({ message: 'New User Created successfully', user: req.body });
  res.status(201);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
