// Main starting point of the application
import express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

// App Setup
app.use(morgan('combined')); // acts as a logger in the Terminal
app.use(bodyParser.json({ type: '*/*' }));

// Server Setup
const port = process.env.PORT || 3000;
const server = Server(app);
server.listen(port, () => {
  console.log(`Server running on: localhost:${port}`);
});
