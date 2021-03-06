import mongoose from 'mongoose';
 
import User from './user';
import Post from './post';
 
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
 
const models = { User, Post };
 
export { connectDb };
 
export default models;
