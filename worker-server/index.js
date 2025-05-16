const { connect } = require('nats');

const runWorker = async () => {
  const nc = await connect({ servers: 'localhost:4222' });
  console.log('Worker connected to NATS');

  // Run event every 15 mins

  setInterval(() => {
    const message = JSON.stringify({ trigger: 'update' });
    nc.publish(
      'crypto.update',
      new TextEncoder().encode(message)
    );
    console.log('Published: update event');
  }, 15 * 60 * 1000);
};

runWorker().catch(console.error);


