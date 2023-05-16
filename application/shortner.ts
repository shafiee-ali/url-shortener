import { LongUrlType, ShortUrlType } from "../domain/shortner";
import ShortUrlDataAccess from "../data-access/shortener";
import { redisClient } from "../database-connection";


class UrlShortnerApplication {
    private static shortingUrlAlgorith(url: string): string
    {
        return url;
    }
    public static async shortingUrl(input: LongUrlType): Promise<ShortUrlType> 
    {
        
        let shortUrl: string | null | undefined = await redisClient.get(input.longUrl);
        if (shortUrl){
            console.log('Hitting cache for get short url');
            return {shortUrl}   
        }
        console.log('Missing cache for get short url');
        shortUrl = await ShortUrlDataAccess.findByLongUrl(input.longUrl)
        if (!shortUrl) {
            console.log('Short url not exist in database');
            shortUrl = this.shortingUrlAlgorith(input.longUrl);
            await ShortUrlDataAccess.insert(input.longUrl, shortUrl);
        }
        console.log('Short url exists in database but not cached');
        redisClient.set(input.longUrl, shortUrl);
        return {shortUrl}
    }

    public static async getLongUrl(input: ShortUrlType): Promise<LongUrlType | undefined> {
        let longUrl;
        longUrl = await redisClient.get(input.shortUrl);
        if (!longUrl) {
            longUrl = await ShortUrlDataAccess.findByShortUrl(input.shortUrl);
        }
        if (longUrl){
            return {longUrl};
        }
        return undefined;
    }
}

export default UrlShortnerApplication;