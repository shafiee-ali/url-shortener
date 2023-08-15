import * as mongoose from 'mongoose';
import { RedisClientType, createClient } from 'redis';
import { Logging } from './util/logging';

const PORT = 8080


const connectToMongo = async () => {
    let MONGO_URL;
    if (process.env.MONGO_USER && process.env.MONGO_PASS) {
        MONGO_URL =
            `mongodb://${process.env.MONGO_USER
            }:${process.env.MONGO_PASS
            }@${process.env.MONGO_HOST
            }:${process.env.MONGO_PORT
            }/${process.env.MONGO_DATABASE
            }`;
    } else {
        MONGO_URL =
            `mongodb://${process.env.MONGO_HOST
            }:${process.env.MONGO_PORT
            }/${process.env.MONGO_DATABASE
            }`;
    }
    await mongoose.connect(MONGO_URL).then(_ => {
        Logging.logger.info('Mongodb connected')
        })
}

let redisClient: RedisClientType;
const connectToRedis = async () => {
    const REDIS_URL = 
    `redis://${process.env.REDIS_HOST
    }:${process.env.REDIS_PORT}`;

    redisClient = createClient({
        url: REDIS_URL
    });
    await redisClient.connect().then(_ => {
        Logging.logger.info('Redis connected')
    })
    return redisClient;
}




export {
    connectToRedis,
    redisClient,
    connectToMongo
};
