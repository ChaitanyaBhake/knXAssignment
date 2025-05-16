const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/configureDB');
const {
  storeCryptoStats,
} = require('./src/services/storeCryptoStats');
const statsRoutes = require("./src/routes/latestDataRoutes"); 
const {listenToEvents} = require("./src/nats/subscribe")

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Yo I am running chill!');
});

app.get("/fetch-and-store", async (req, res) => {
  await storeCryptoStats();
  res.send(" Crypto stats fetched and stored.");
});

app.use("/", statsRoutes); 

connectDB().then(async () => {
  listenToEvents()
  app.listen(process.env.PORT, () => {
    console.log(
      'Server is listening on Port:',
      process.env.PORT
    );
  });
});
