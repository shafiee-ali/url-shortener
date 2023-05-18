import { LongUrlType, ShortUrlType } from "../domain/shortner";
import ShortUrlDataAccess from "../data-access/shortener";
import { redisClient } from "../database-connection";
import { generate } from 'shortid';


class UrlShortnerApplication {
    private static BASE_URL = 'http://localhost:8001/' 
    private static shortingUrlAlgorith(): string
    {
        console.log('1');
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
            console.log(shortUrl);
            return {shortUrl: this.BASE_URL + shortUrl}   
        }
        console.log('Missing cache for get short url');
        console.log(shortUrl);
        shortUrl = await ShortUrlDataAccess.findByLongUrl(input.longUrl)
        if (!shortUrl) {
            console.log('Short url not exist in database');
            console.log('Creating new short url');
            console.log(shortUrl);
            shortUrl = this.shortingUrlAlgorith();
            console.log(`long url is ${input.longUrl}`);
            await ShortUrlDataAccess.insert(input.longUrl, shortUrl);
        }
        console.log('Short url exists in database but not cached');
        redisClient.set(input.longUrl, shortUrl);
        return {shortUrl: this.BASE_URL + shortUrl}   

    }

    public static async getLongUrl(input: ShortUrlType): Promise<LongUrlType | undefined> {
        let longUrl;
        const splitedUrlBySlash = input.shortUrl.split('/');
        console.log(`splited list is ${splitedUrlBySlash.toString()}`);
        let shortUrlWithoutBaseUrl = splitedUrlBySlash[splitedUrlBySlash.length - 1];
        console.log(`short part is ${shortUrlWithoutBaseUrl}`);
        longUrl = await redisClient.get(shortUrlWithoutBaseUrl);
        if (!longUrl) {
            longUrl = await ShortUrlDataAccess.findByShortUrl(shortUrlWithoutBaseUrl);
            console.log(`long url is ${longUrl}`);
            if (!longUrl) {
                return undefined;
            }
            console.log(`long url is ${longUrl}`);
            redisClient.set(longUrl, shortUrlWithoutBaseUrl);
        }
        if (longUrl){
            return {longUrl};
        }
        return undefined;
    }
}

export default UrlShortnerApplication;