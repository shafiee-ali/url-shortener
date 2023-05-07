import { ShortUrlInput, ShortUrlOutput } from "../domain/shortner";
import ShortUrlDataAccess from "../data-access/shortener";
import { redisClient } from "../database-connection";


class UrlShortnerApplication {
    private static shortingUrlAlgorith(url: string): string
    {
        return url;
    }
    public static async shortUrl(input: ShortUrlInput): Promise<ShortUrlOutput> 
    {
        
        let shortUrl: string | null | undefined = await redisClient.get(input.url);
        if (shortUrl){
            console.log('Hitting cache for get short url');
            return {shortUrl}   
        }
        console.log('Missing cache for get short url');
        shortUrl = await ShortUrlDataAccess.findByMainUrl(input.url)
        if (!shortUrl) {
            console.log('Short url not exist in database');
            shortUrl = this.shortingUrlAlgorith(input.url);
            await ShortUrlDataAccess.insert(input.url, shortUrl);
        }
        console.log('Short url exists in database but not cached');
        redisClient.set(input.url, shortUrl);
        return {shortUrl}
    }
}

export default UrlShortnerApplication;