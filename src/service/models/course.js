import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    authors: {
      type: [String],
    },
    owner: {
      type: String,
      required: [true, 'Owner is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

const Course = mongoose.model('course', schema);

export default Course;
