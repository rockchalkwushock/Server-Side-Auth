// Main starting point of the application
import express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router';

const app = express();
const MONGO_URL = 'mongodb://localhost:auth/auth'

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);

// App Setup
app.use(morgan('combined')); // acts as a logger in the Terminal
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = Server(app);
server.listen(port, () => {
  console.log(`Server running on: localhost:${port}`);
});
