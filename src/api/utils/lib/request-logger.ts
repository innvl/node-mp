import * as morgan from 'morgan';
import { logger } from './logger';

const format = 'dev';

export const requestLogger = morgan(format, {
    skip(_req, res) {
        return res.statusCode < 400;
    },
    stream: {
        write: (message: string) => {
            logger.error(message.trim());
        }
    }
});
