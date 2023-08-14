import express, {Express} from 'express';
import UrlShortenerPresentation from './presentation/shortener';
import {redisClient, connectToMongo} from './database-connection';
import {config} from 'dotenv-flow';
config();


const start = async () => {
    const app: Express = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/shorten', UrlShortenerPresentation.shortenUrl)
    app.get('/:shortUrl', UrlShortenerPresentation.getLongUrl)


    await connectToMongo();
    await redisClient.connect();
    console.log('Redis connected');
    const port = process.env.SERVER_PORT || 8081;
    app.listen(port, () => {
        console.log(`Sever is Up in port ${port}`);
    });

}


start()