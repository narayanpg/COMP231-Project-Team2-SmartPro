import mongoose from 'mongoose';

const {
  Schema
} = mongoose;

const ResidentSchema = new Schema({
  unit: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // dob: {
  //   type: Date,
  //   required: true,
  // },
  livingSince: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  unitSharedWith: {
    type: Number,
    required: true,
  },
  accessCode: {
    type: String,
    required: true,
  },
});
export default mongoose.model('Resident', ResidentSchema);