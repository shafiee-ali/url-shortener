import { log } from 'console';
import * as mongoose from 'mongoose';
import { RedisClientType, createClient } from 'redis';

const PORT = 8080


const connectToMongo = async () => {
    let dbURI;
    if (process.env.MONGO_USER && process.env.MONGO_PASS) {
        dbURI =
            `mongodb://${process.env.MONGO_USER
            }:${process.env.MONGO_PASS
            }@${process.env.MONGO_HOST
            }:${process.env.MONGO_PORT
            }/${process.env.MONGO_DATABASE
            }`;
    } else {
        dbURI =
            `mongodb://${process.env.MONGO_HOST
            }:${process.env.MONGO_PORT
            }/${process.env.MONGO_DATABASE
            }`;
    }
    await mongoose.connect(dbURI).then(res => {
        console.log('Connected to mongodb');
    })
}

const REDIS_URL = 'redis://localhost:6379'
const redisClient: RedisClientType = createClient({
    url: REDIS_URL
});



export {
    redisClient,
    connectToMongo
};
