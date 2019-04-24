
import Mongoose from 'mongoose';

export default async function getMongooseConnection() {
  const mongoURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  return Mongoose.connect(mongoURI, { useNewUrlParser: true, poolSize: 10 });
}