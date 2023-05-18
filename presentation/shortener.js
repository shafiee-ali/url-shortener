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
const zod_1 = require("zod");
const shortner_1 = __importDefault(require("../application/shortner"));
class UrlShortenerPresentation {
    static shortenUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodyValidator = zod_1.z.object({
                longUrl: zod_1.z.string().url()
            });
            const parseResult = bodyValidator.safeParse(req.body);
            if (parseResult.success) {
                const urlShortenerResponse = yield shortner_1.default.shortingUrl(parseResult.data);
                res.status(200).send(urlShortenerResponse);
            }
            else {
                res.status(404).send({ error: "Error!!!!!!!!!!!!!" });
            }
        });
    }
    static getLongUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryValidator = zod_1.z.object({
                shortUrl: zod_1.z.string()
            });
            const parseResult = queryValidator.safeParse(req.params);
            if (parseResult.success) {
                console.log(`Short url is ${parseResult.data.shortUrl}`);
                const longUrl = yield shortner_1.default.getLongUrl(parseResult.data);
                if (longUrl) {
                    res.redirect(longUrl.longUrl);
                }
                else {
                    res.send(404);
                }
            }
            else {
                res.status(404).send({ error: "Error!!!!!!!!!!!!!" });
            }
        });
    }
}
exports.default = UrlShortenerPresentation;
