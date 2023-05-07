import * as mongoose from 'mongoose';

const PORT = 8080


const connectToMongo = async () => {
    const url = 'mongodb://localhost:27017/url_shortener'
    await mongoose.connect(url).then(res => console.log('Connected to mongodb'))
}

const connectToRedis = async () => {
    const url = 'mongodb://localhost:27017/url_shortener'
    await mongoose.connect(url).then(res => console.log('Connected to mongodb'))
}


export default connectToMongo;
