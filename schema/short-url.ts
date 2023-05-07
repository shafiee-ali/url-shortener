import {Schema} from 'mongoose';

const ShortUrlSchema = new Schema({
    url: String,
    shortUrl: String,
})

export default ShortUrlSchema;