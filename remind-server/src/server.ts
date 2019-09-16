import http from 'http';
import express from 'express';
import { loggerMiddleware } from './middleware/logger.middleware';
import bodyParser from 'body-parser';

const router = express();
router.use(loggerMiddleware);
router.use(bodyParser.json());


const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () => {
    console.log(`Remind Server is listening at http://localhost:${PORT}...`);
});