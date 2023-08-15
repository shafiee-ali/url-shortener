import express, { Express } from 'express';
import UrlShortenerPresentation from './presentation/shortener';
import { databaseConnections } from './database-connection';
import { config } from 'dotenv-flow';
import { Logging } from './util/logging';
config();


const start = async () => {
    const app: Express = express();
    const port = process.env.SERVER_PORT || 3001;

    Logging.createLogger();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/shorten', UrlShortenerPresentation.shortenUrl)
    app.get('/:shortUrl', UrlShortenerPresentation.getLongUrl)

    await databaseConnections().then(() => {
        app.listen(port, () => {
            Logging.logger.info(`Sever is Up in port ${port}`);
        });
    })
}


start()