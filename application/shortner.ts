import { ShortUrlInput, ShortUrlOutput } from "../domain/shortner";
import ShortUrlDataAccess from "../data-access/shortener";


class UrlShortnerApplication {
    private static shortingUrlAlgorith(url: string): string
    {
        return url;
    }
    public static async shortUrl(input: ShortUrlInput): Promise<ShortUrlOutput> 
    {
        let shortUrl = await ShortUrlDataAccess.findByMainUrl(input.url)
        if (!shortUrl) {
            shortUrl = this.shortingUrlAlgorith(input.url);
            await ShortUrlDataAccess.insert(input.url, shortUrl);
        }
        return {shortUrl}
    }
}

export default UrlShortnerApplication;