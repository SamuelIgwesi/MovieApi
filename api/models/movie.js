const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    imgTitle: { type: String },
    img: { type: String },
    imgSm: { type: Boolean, default: false },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
