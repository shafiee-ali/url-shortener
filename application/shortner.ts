import { LongUrlType, ShortUrlType } from "../domain/shortner";
import ShortUrlDataAccess from "../data-access/shortener";
import { redisClient } from "../database-connection";
import { generate } from 'shortid';
import { Logging } from "../util/logging";


class UrlShortnerApplication {
    private static BASE_URL = `http://localhost:${process.env.SERVER_PORT}/`
    private static shortingUrlAlgorith(): string {
        return generate();
    }
    private static generateUniqueId(url: string): string {
        return url;
    }

    public static getFullShortUrl(shortUrl: string) {
        return { shortUrl: this.BASE_URL + shortUrl };
    }
    public static async shortingUrl(input: LongUrlType): Promise<ShortUrlType> {
        let shortUrl: string | null | undefined = await redisClient.get(input.longUrl);
        if (shortUrl) {
            Logging.logger.trace({ longUrl: input.longUrl, shortUrl }, 'application::shortingUrl::Cache Hit');
            return this.getFullShortUrl(shortUrl)
        }
        Logging.logger.trace({ longUrl: input.longUrl }, 'application::shortingUrl::Cache Miss');
        shortUrl = await ShortUrlDataAccess.findByLongUrl(input.longUrl)
        if (!shortUrl) {
            Logging.logger.trace({ longUrl: input.longUrl }, 'application::shortingUrl::Short url not exist in database');
            Logging.logger.trace({ shortUrl }, 'application::shortingUrl::Creating new short url');
            shortUrl = this.shortingUrlAlgorith();
            Logging.logger.trace({ longUrl: input.longUrl, shortUrl }, `application::shortingUrl::Generated Long url`);
            redisClient.set(input.longUrl, shortUrl);
            await ShortUrlDataAccess.insert(input.longUrl, shortUrl);
            return { shortUrl: this.BASE_URL + shortUrl }
        }
        Logging.logger.trace({ longUrl: input.longUrl, shortUrl }, `application::shortingUrl::Short url exists in database but not cached`);
        redisClient.set(input.longUrl, shortUrl);
        return { shortUrl: this.BASE_URL + shortUrl }

    }

    public static async getLongUrl(input: ShortUrlType): Promise<LongUrlType | undefined> {
        let longUrl;
        const splitedUrlBySlash = input.shortUrl.split('/');
        Logging.logger.trace(`application::getLongUrl::Splited list is ${splitedUrlBySlash.toString()}`);
        let shortUrlWithoutBaseUrl = splitedUrlBySlash[splitedUrlBySlash.length - 1];
        Logging.logger.trace(`application::getLongUrl::short part is ${shortUrlWithoutBaseUrl}`);
        longUrl = await redisClient.get(shortUrlWithoutBaseUrl);
        if (!longUrl) {
            longUrl = await ShortUrlDataAccess.findByShortUrl(shortUrlWithoutBaseUrl);
            Logging.logger.trace({ longUrl, shortUrl: input.shortUrl }, `application::getLongUrl::Long url`);
            if (!longUrl) {
                return undefined;
            }
            redisClient.set(longUrl, shortUrlWithoutBaseUrl);
        }
        if (longUrl) {
            return { longUrl };
        }
        return undefined;
    }
}

export default UrlShortnerApplication;