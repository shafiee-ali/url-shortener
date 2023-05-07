import * as mongoose from 'mongoose';
import { RedisClientType, createClient } from 'redis';


const PORT = 8080


const connectToMongo = async () => {
    const url = 'mongodb://localhost:27017/url_shortener'
    await mongoose.connect(url).then(res => console.log('Connected to mongodb'))
}

const REDIS_URL = 'redis://localhost:6379'
const redisClient: RedisClientType = createClient({
    url: REDIS_URL
});



export {
    redisClient,
    connectToMongo
};
