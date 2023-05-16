import {Schema} from 'mongoose';

const ShortUrlSchema = new Schema({
    longurl: String,
    shortUrl: String,
})

export default ShortUrlSchema;