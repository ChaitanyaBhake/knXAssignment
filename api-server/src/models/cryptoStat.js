const mongoose = require('mongoose');

const cryptoStatSchema = new mongoose.Schema({
  coin: { type: String, required: true },
  price_usd: Number,
  market_cap_usd: Number,
  change_24h: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  'CryptoStat',
  cryptoStatSchema
);
