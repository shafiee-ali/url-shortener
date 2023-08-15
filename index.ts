import express, {Express} from 'express';
import UrlShortenerPresentation from './presentation/shortener';
import {connectToRedis, connectToMongo} from './database-connection';
import {config} from 'dotenv-flow';
import {Logging} from './util/logging';
config();


const start = async () => {
    const app: Express = express();
    
    Logging.createLogger();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/shorten', UrlShortenerPresentation.shortenUrl)
    app.get('/:shortUrl', UrlShortenerPresentation.getLongUrl)


    await connectToMongo();
    await connectToRedis();
    const port = process.env.SERVER_PORT || 8081;
    app.listen(port, () => {
        Logging.logger.info(`Sever is Up in port ${port}`);
    });

}


start()