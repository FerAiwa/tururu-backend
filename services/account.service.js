'use strict';
import mongodb from 'mongodb';
import Mongoose from 'mongoose';
import uuiV4 from 'uuidv4';
import { accountSchemas } from './schemas';

//UTILS _________________________________________________________________
const hashpassword = (password) => bcrypt.hash(password, 10);
//Replaces the first T, to be properly stored in SQL date format (UTC)
const getNormalizedNowDate = () => new Date().toISOString().substring(0, 19).replace('T', ' ');

const User = Mongoose.model('User');
const Verification = Mongoose.model('Verification');

async function getConnection() {
  const mongoURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  return Mongoose.connect(mongoURI, { useNewUrlParser: true, poolSize: 10 });
}

async function insertNewUser(user) {
  try {
    const connection = await getConnection();
    // const User = Mongoose.model('User');
    //const User = connection.model('User', accountSchemas.user, 'users');
    const newUser = new User(user);
    newUser.save();
    return newUser._id
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function confirmUser(id) {
  try {
    const connection = await getConnection();
    //const User = connection.model('User', accountSchemas.user, 'users');
    return User.findByIdAndUpdate({ _id: id }, { verificated_at: getNormalizedNowDate() });
  }
  catch (e) {
    return res.status(500).send(e.message)
  }
}

async function addVerificationCode(userId) {
  try {
    const connection = await getConnection();
    // const Verification = Mongoose.model('Verification');
    //const Verification = connection.model('Verification', accountSchemas.verification, 'users_activation');
    const newVerification = new Verification({
      user_uuid: userId,
      verification_code: uuiV4(),
      created_at: getNormalizedNowDate()
    });
    newVerification.save()
    return newVerification.verification_code
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function findVerificationRegister(verification_code) {
  try {
    const connection = await getConnection();
    // const Verification = Mongoose.model('Verification');
    //const Verification = connection.model('Verification', accountSchemas.verification, 'users_activation');
    return Verification.findOne({ verification_code });
  }
  catch (e) {
    return res.status(500).send(e.message);
  }
}

export const accountService = {
  addVerificationCode,
  confirmUser,
  findVerificationRegister,
  insertNewUser,
}