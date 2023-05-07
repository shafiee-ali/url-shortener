import { Request, Response } from 'express';
import { z } from 'zod';

export default class UrlShortenerPresentation {
    public static async shortenerPostApi(req: Request, res: Response): Promise<void> {
        const bodyValidator = z.object({
            url: z.string().url()
        });
        const parseResult = bodyValidator.safeParse(req.body)
        if (parseResult.success) {
            const urlShortenerResponse = { shortUrl: 'http://localhost.com/mocked-url' };
            res.status(200).send(urlShortenerResponse);
        } else {
            res.status(404).send({ error: "Error!!!!!!!!!!!!!" });
        }
    }
}