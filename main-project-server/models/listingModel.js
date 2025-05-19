const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  address: String,
  type: {
    type: String,
    enum: ['sell', 'rent'],
    default: 'rent'
  },
  bedrooms: {
    type: Number,
    default: 1
  },
  bathrooms: {
    type: Number,
    default: 1
  },
  regularPrice: Number,
  discountPrice: Number,
  offer: {
    type: Boolean,
    default: false
  },
  parking: {
    type: Boolean,
    default: false
  },
  furnished: {
    type: Boolean,
    default: false
  },
  imageUrls: {
    type: [String],
    default: []
  }
}, { timestamps: true });

listingSchema.index({ name: 'text' }); // Optional: for text search

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
