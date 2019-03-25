import mongoose from 'mongoose';
//import bcryptjs from 'bcryptjs';


const {
  Schema
} = mongoose;

const StaffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  workingSince: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  accessCode: {
    type: String,
    required: true,
  },
});
//to-do: hash password if this is user
export default mongoose.model('Staff', StaffSchema);