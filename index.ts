import express, {Express} from 'express';
import UrlShortenerPresentation from './presentation/shortener';
import {redisClient, connectToMongo} from './database-connection';


const start = async () => {
    const app: Express = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/shorten', UrlShortenerPresentation.shortenUrl)
    app.get('/:shortUrl', UrlShortenerPresentation.getLongUrl)


    await connectToMongo();
    await redisClient.connect();
    console.log('Redis connected');
    app.listen(8001, () => {
        console.log('Sever is Up in port 8001');
    });

}


start()