"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ShortUrlSchema = new mongoose_1.Schema({
    longurl: String,
    shortUrl: String,
});
exports.default = ShortUrlSchema;
