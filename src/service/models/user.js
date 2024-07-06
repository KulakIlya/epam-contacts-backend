import mongoose, { Schema } from 'mongoose';

import { emailRegex } from '../../constants.js';

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      min: [1, 'Name is too short'],
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return emailRegex.test(v);
        },
        message: 'Email is not valid',
      },
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [6, 'Password is too short'],
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false }
);

const User = mongoose.model('user', schema);

export default User;
