import { PickResultType } from "@grpc/grpc-js/build/src/picker";
import ShortUrlModel from "../model/short-url";

class ShurtUrlDataAccess {
    public static async findByMainUrl(url: string) {
        const result = await ShortUrlModel.findOne({url});
        return result;
    }
    public static async insert(url: string, shortUrl: string) {
        await ShortUrlModel.create({url, shortUrl});
    }
}