const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: [true, "Full Url is required!"]
  },
  shortUrl: {
    type: String,
    required: [true, "Short Url is required!"]
  },
/*   clicks: {
    type: Number,
    required: true,
    default: 0
  }, */
  date: { 
    type: String, 
    required: true,
    default: Date.now
  }
});

let Url =  mongoose.model('Url', urlSchema);

module.exports = {
  Url,
  urlSchema
}