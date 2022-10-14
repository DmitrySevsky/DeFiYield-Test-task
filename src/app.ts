import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import tokens from './routes/token.router';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use('/api', tokens);

app.listen(port, () => {
  console.log(`Server is running at port ${port}!`);
});