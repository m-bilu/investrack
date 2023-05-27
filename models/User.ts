import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  watchlists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Watchlist',
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
