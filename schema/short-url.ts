import {Schema} from 'mongoose';

const ShortUrl = new Schema({
    url: String,
    shortUrl: String,
})

export default ShortUrl;