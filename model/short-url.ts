import mongoose from 'mongoose';
import ShortUrlSchema from '../schema/short-url';


const ShortUrlModel = mongoose.model('ShortUrl', ShortUrlSchema, 'ShortUrl');

export default ShortUrlModel;