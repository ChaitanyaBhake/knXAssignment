const { connect } = require('nats');
const {
  storeCryptoStats,
} = require('../services/storeCryptoStats');

exports.listenToEvents = async () => {
  const nc = await connect({ servers: 'localhost:4222' });
  console.log('API Server connected to NATS');

  const sub = nc.subscribe('crypto.update');

  for await (const msg of sub) {
    console.log('Received update event from NATS');
    await storeCryptoStats();
  }
};
