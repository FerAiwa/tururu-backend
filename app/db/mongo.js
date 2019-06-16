import Mongoose from 'mongoose';

export default async function getMongooseConnection() {
  // const local = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  const remote = `${process.env.MONGO_REMOTE}`;
  return Mongoose.connect(remote, {
    useNewUrlParser: true,
    poolSize: 10,
  });
}
