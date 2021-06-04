const mongoose = require('mongoose');

require('dotenv').config();

const { Schema } = mongoose;

const shortenedUrlSchema = new Schema({
  url: {type: String, required: true},
  code: {type: String, required: true, unique: true}
});

const shortenedUrl = mongoose.model('shortenedUrl', shortenedUrlSchema);

module.exports = shortenedUrl;
