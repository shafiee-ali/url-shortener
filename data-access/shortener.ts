import { PickResultType } from "@grpc/grpc-js/build/src/picker";
import ShortUrlModel from "../model/short-url";

class ShortUrlDataAccess {
    public static async findByLongUrl(longUrl: string): Promise<string | undefined> {
        const result = await ShortUrlModel.findOne({longUrl});
        return result?.shortUrl;
    }

    public static async findByShortUrl(shortUrl: string): Promise<string | undefined> {
        const result = await ShortUrlModel.findOne({shortUrl});
        return result?.longurl;
    }
    public static async insert(id: string, url: string, shortUrl: string) {
        await ShortUrlModel.create({url, shortUrl});
    }
}

export default ShortUrlDataAccess;