const CryptoStat = require('../models/cryptoStat');

exports.getStats = async (req, res) => {
  const coin = req.query.coin;

  if (
    !coin ||
    !['bitcoin', 'ethereum', 'matic-network'].includes(coin)
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing coin parameter' });
  }

  try {
    const latest = await CryptoStat.findOne({ coin }).sort({
      timestamp: -1,
    });

    if (!latest) {
      return res
        .status(404)
        .json({ error: 'No data found for this coin' });
    }

    return res.status(200).json({
      price: Math.round(latest.price_usd),
      marketCap: Math.round(latest.market_cap_usd),
      '24hChange': Number(latest.change_24h.toFixed(1)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

//deviation calculation formula 

//1. calculation of mean i.e average of 100 Prices which is :-
// Sum of Latest 100 records divided by hundred


//2. calculation of variance i.e how much spread out the numbers are from the average (mean)
// If variance is small , values are close to the mean 
// If variance is large, values are spread out widely from the mean
// For each price xi, calculate (xi - mean)^2
// Sum all xi values and divide by 100 or prices.length


// 3. calculation of deviation i.e it tells us how much, on average, the values deviate from the mean in the original units (not squared).
// Square root of variance 


exports.showDeviation = async (req, res) => {
  const coin = req.query.coin;

  if (
    !coin ||
    !['bitcoin', 'ethereum', 'matic-network'].includes(coin)
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing coin parameter' });
  }

  try {
    // Fetch last 100 records sorted by timestamp descending
    const records = await CryptoStat.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('price_usd -_id'); // only need price_usd field

    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: 'No data found for this coin' });
    }

    const prices = records.map((r) => r.price_usd);

    // Calculate mean
    const mean =
      prices.reduce((sum, val) => sum + val, 0) /
      prices.length;

    // Calculate variance
    const variance =
      prices.reduce(
        (sum, val) => sum + (val - mean) ** 2,
        0
      ) / prices.length;

    // Standard deviation
    const deviation = Math.sqrt(variance);

    return res.json({
      deviation: Number(deviation.toFixed(2)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


