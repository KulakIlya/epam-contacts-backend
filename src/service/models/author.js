import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    owner: { type: String, required: [true, 'Owner is required'] },
  },
  { versionKey: false }
);

const Author = mongoose.model('author', schema);

export default Author;
