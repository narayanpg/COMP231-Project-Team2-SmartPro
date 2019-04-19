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
  unit: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});
export default mongoose.model('Request', RequestSchema);