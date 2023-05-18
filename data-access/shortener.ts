import { PickResultType } from "@grpc/grpc-js/build/src/picker";
import ShortUrlModel from "../model/short-url";

class ShortUrlDataAccess {
    public static async findByLongUrl(longUrl: string): Promise<string | undefined> {
        const result = await ShortUrlModel.findOne({longUrl});
        return result?.shortUrl;
    }

    public static async findByShortUrl(shortUrl: string): Promise<string | undefined> {
        const result = await ShortUrlModel.findOne({shortUrl});
        return result?.longUrl;
    }
    public static async insert(longUrl: string, shortUrl: string) {
        await ShortUrlModel.create({longUrl, shortUrl});
    }
}

export default ShortUrlDataAccess;