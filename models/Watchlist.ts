import mongoose from 'mongoose';

const { Schema } = mongoose;

const WatchlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stocks: [
    {
      type: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Watchlist =
  mongoose.models.Watchlist || mongoose.model('Watchlist', WatchlistSchema);
export default Watchlist;
