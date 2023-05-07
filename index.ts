import express, {Express} from 'express';
import UrlShortenerPresentation from './presentation/shortener';


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/short', UrlShortenerPresentation.shortenerPostApi)

app.listen(8001, () => {
    console.log('Sever is Up in port 8001');
});