import { LongUrlType, ShortUrlType } from "../domain/shortner";
import ShortUrlDataAccess from "../data-access/shortener";
import { redisClient } from "../database-connection";
import { generate } from 'shortid';


class UrlShortnerApplication {
    private static BASE_URL = 'http://localhost:8001/' 
    private static shortingUrlAlgorith(): string
    {
        return generate();
    }
    private static generateUniqueId(url: string): string
    {
        return url;
    }
    public static async shortingUrl(input: LongUrlType): Promise<ShortUrlType> 
    {
        
        let shortUrl: string | null | undefined = await redisClient.get(input.longUrl);
        if (shortUrl){
            console.log('Hitting cache for get short url');
            return {shortUrl: this.BASE_URL + shortUrl}   
        }
        console.log('Missing cache for get short url');
        shortUrl = await ShortUrlDataAccess.findByLongUrl(input.longUrl)
        if (!shortUrl) {
            console.log('Short url not exist in database');
            shortUrl = this.shortingUrlAlgorith();
            await ShortUrlDataAccess.insert(input.longUrl, shortUrl);
        }
        console.log('Short url exists in database but not cached');
        redisClient.set(input.longUrl, shortUrl);
        return {shortUrl}
    }

    public static async getLongUrl(input: ShortUrlType): Promise<LongUrlType | undefined> {
        let longUrl;
        const splitedUrlBySlash = input.shortUrl.split('/');
        let shortUrlWithoutBaseUrl = splitedUrlBySlash[splitedUrlBySlash.length - 1];
        longUrl = await redisClient.get(shortUrlWithoutBaseUrl);
        if (!longUrl) {
            longUrl = await ShortUrlDataAccess.findByShortUrl(shortUrlWithoutBaseUrl);
        }
        if (longUrl){
            return {longUrl};
        }
        return undefined;
    }
}

export default UrlShortnerApplication;