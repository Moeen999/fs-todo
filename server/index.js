import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Welcome to Chore Chuckles!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});