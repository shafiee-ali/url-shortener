import { Request, Response } from 'express';
import { z } from 'zod';
import UrlShortnerApplication from '../application/shortner';

export default class UrlShortenerPresentation {
    public static async shortenUrl(req: Request, res: Response): Promise<void> {
        const bodyValidator = z.object({
            longUrl: z.string().url()
        });
        const parseResult = bodyValidator.safeParse(req.body)
        if (parseResult.success) {
            const urlShortenerResponse = await UrlShortnerApplication.shortingUrl(parseResult.data);
            res.status(200).send(urlShortenerResponse);
        } else {
            res.status(404).send({ error: "Error!!!!!!!!!!!!!" });
        }
    }

    public static async getLongUrl(req: Request, res: Response): Promise<void> {
        const queryValidator = z.object({
            shortUrl: z.string()
        });
        const parseResult = queryValidator.safeParse(req.params)
        if (parseResult.success) {
            const longUrl = await UrlShortnerApplication.getLongUrl(parseResult.data);
            if (longUrl) {
                res.redirect(longUrl.longUrl);
            } else {
                res.send(404);
            }
        } else {
            res.status(404).send({ error: "Error!!!!!!!!!!!!!" });
        }
    }
}