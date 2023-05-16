import {Schema} from 'mongoose';

const ShortUrlSchema = new Schema({
    longUrl: String,
    shortUrl: String,
})

export default ShortUrlSchema;