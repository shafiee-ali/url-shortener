"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const short_url_1 = __importDefault(require("../schema/short-url"));
const ShortUrlModel = mongoose_1.default.model('ShortUrl', short_url_1.default, 'ShortUrl');
exports.default = ShortUrlModel;
