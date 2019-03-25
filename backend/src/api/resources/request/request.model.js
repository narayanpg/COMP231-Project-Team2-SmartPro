import mongoose from 'mongoose';
//import bcryptjs from 'bcryptjs';


const {
  Schema
} = mongoose;

const RequestSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
//to-do: hash password if this is user
//also upload image
export default mongoose.model('Request', RequestSchema);