import pino from 'pino';
import { Logger } from 'pino';
export class Logging {
    public static logger: Logger;
    static createLogger() {
        this.logger = pino({
            name: 'url-shortener',
            level: 'trace',
            transport: {
                target: 'pino-pretty'
            },
        })
    }
}