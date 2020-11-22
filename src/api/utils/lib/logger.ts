import * as winston from 'winston';
const format = winston.format;

const logFormat = format.printf(({ level, message, label, timestamp }) => {
    return `[${label}] [${level}] ${timestamp} :: ${message}`;
});

export const logger = winston.createLogger({
    format: format.combine(
        format.label({ label: 'NODE MP LOG' }),
        format.timestamp(),
        format.colorize(),
        logFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});
