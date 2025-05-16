const axios = require('axios');
const CryptoStat = require('../models/cryptoStat');

const COINS = ['bitcoin', 'ethereum', 'matic-network'];

exports.storeCryptoStats = async (req, res) => {
  try {
    const baseUrl = `https://api.coingecko.com/api/v3/simple/price`;

    const { data } = await axios.get(baseUrl, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    for (let coin of COINS) {
      const stat = new CryptoStat({
        coin,
        price_usd: data[coin].usd,
        market_cap_usd: data[coin].usd_market_cap,
        change_24h: data[coin].usd_24h_change,
      });
      await stat.save();
    }

    console.log(' Crypto Data:', data); 
    console.log('Stats stored successfully');
  } catch (error) {
    console.error(
      'Error fetching/storing stats:',
      error.message
    );
  }
};
