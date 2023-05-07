import express, {Express} from 'express';
import UrlShortenerPresentation from './presentation/shortener';


const app: Express = express();


app.post('/short', UrlShortenerPresentation.shortenerPostApi)

app.listen(8001);