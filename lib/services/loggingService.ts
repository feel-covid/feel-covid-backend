import { winstonConfig } from '../config/winston.config';
import * as winston from 'winston';

export const logger = winston.createLogger(winstonConfig);
