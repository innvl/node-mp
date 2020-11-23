import express = require('express');
import { NextFunction, Request, Response } from 'express';
import * as cors from 'cors';

import { initRoutes } from './api/routers';
import { logger, requestLogger } from './api/utils/lib';
import config from './config';

const PORT = config.port;
const app = express();

app.use(express.json());
app.use(cors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Internal Server Error: ${error.message} :: ${req.originalUrl} :: ${req.method}`);
    res.status(500).send({ error: 'Internal Server Error' });
    next();
});

app.use(requestLogger);

process.on('uncaughtException', (error: string) => {
    logger.error(error);
    logger.on('finish', () => process.exit(1));
    logger.end();
});

process.on('unhandledRejection', (error: string) => logger.error(error));

initRoutes(app);

app.listen(PORT)
    .on('listening', () => logger.info(`HTTP server listening on port ${PORT}`));

