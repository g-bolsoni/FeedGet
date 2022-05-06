import express from 'express';
import cors from 'cors';
import { routes } from './route';

const app = express();
app.use(cors());
app.use(express.json()); // avisa ao app para aceitar JSON
app.use(routes);

app.listen(3333, () => {
    console.log('HTTP server running on http://localhost:3333')
});

//SQLite
//Prisma - ORM