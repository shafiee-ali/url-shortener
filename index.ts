import express, {Express} from 'express';
import UrlShortenerPresentation from './presentation/shortener';
import connectToMongo from './database-connection';


const start = async () => {
    const app: Express = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post('/short', UrlShortenerPresentation.shortenerPostApi)


    await connectToMongo();
    app.listen(8001, () => {
        console.log('Sever is Up in port 8001');
    });

}


start()