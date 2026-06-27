import express from 'express';
import { AppController } from './app.controller';

const app = express();
app.use(express.json());

const controller = new AppController();
app.get('/api', (req, res) => controller.getData(req, res));

export { app };
