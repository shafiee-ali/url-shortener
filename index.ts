import express, {Express, Request, Response} from 'express';
import {z} from 'zod';


const app: Express = express();


app.post('/short', async (req: Request, res: Response) => {
    const bodyValidator = z.object({
        url: z.string().url()
    });
    const parseResult = bodyValidator.safeParse(req.body)
})

app.listen(8001);