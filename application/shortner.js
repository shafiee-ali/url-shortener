"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortener_1 = __importDefault(require("../data-access/shortener"));
const database_connection_1 = require("../database-connection");
const shortid_1 = require("shortid");
class UrlShortnerApplication {
    static shortingUrlAlgorith() {
        return (0, shortid_1.generate)();
    }
    static generateUniqueId(url) {
        return url;
    }
    static shortingUrl(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let shortUrl = yield database_connection_1.redisClient.get(input.longUrl);
            if (shortUrl) {
                console.log('Hitting cache for get short url');
                console.log(shortUrl);
                return { shortUrl: this.BASE_URL + shortUrl };
            }
            console.log('Missing cache for get short url');
            console.log(shortUrl);
            shortUrl = yield shortener_1.default.findByLongUrl(input.longUrl);
            if (!shortUrl) {
                console.log('Short url not exist in database');
                console.log('Creating new short url');
                console.log(shortUrl);
                shortUrl = this.shortingUrlAlgorith();
                yield shortener_1.default.insert(input.longUrl, shortUrl);
            }
            console.log('Short url exists in database but not cached');
            database_connection_1.redisClient.set(input.longUrl, shortUrl);
            return { shortUrl: this.BASE_URL + shortUrl };
        });
    }
    static getLongUrl(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let longUrl;
            const splitedUrlBySlash = input.shortUrl.split('/');
            console.log(`splited list is ${splitedUrlBySlash.toString()}`);
            let shortUrlWithoutBaseUrl = splitedUrlBySlash[splitedUrlBySlash.length - 1];
            console.log(`short part is ${shortUrlWithoutBaseUrl}`);
            longUrl = yield database_connection_1.redisClient.get(shortUrlWithoutBaseUrl);
            if (!longUrl) {
                longUrl = yield shortener_1.default.findByShortUrl(shortUrlWithoutBaseUrl);
                console.log(`long url is ${longUrl}`);
                if (!longUrl) {
                    return undefined;
                }
                console.log(`long url is ${longUrl}`);
                database_connection_1.redisClient.set(longUrl, shortUrlWithoutBaseUrl);
            }
            if (longUrl) {
                return { longUrl };
            }
            return undefined;
        });
    }
}
UrlShortnerApplication.BASE_URL = 'http://localhost:8001/';
exports.default = UrlShortnerApplication;
