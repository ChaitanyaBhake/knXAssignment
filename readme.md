---
`Prerequisites`

- Install NATS server from nats official github repo [here](https://github.com/nats-io/nats-server/releases/tag/v2.11.3) on your device.

- Make sure the nats server is running locally on port 4222

- ENV example for `api-server`
    ```
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/cryptoStats_db or Atlas Cluster String
    ```

---

`How to run Locally`

- Step-1

  - Once the nats server is running locally open worker-server and in terminal use the following commands :-

    - `npm i` to download all dependencies.
    - `npm run dev` to fire the server.

  - Now `worker-server` will broadcast event every 15 mins.

- Step-2

  - Once the worker server is running locally open api sever and in terminal use the following commands :-

    - `npm i` to download all dependencies.
    - `npm run dev` to fire the server on `localhost:4000`.

  - Now `api-server` will listen NATS event from `worker-server` and perform actions.

---

`Api Endpoints from api-server`

- `/stats` :- Returns the data for the particular cryptocurrency.

              query params = bitcoin / ethereum / matic-network

- `/deviation` :- Shows the deviation for the particular cryptocurrency.

             query params = bitcoin / ethereum / matic-network

---

`Workflow`

```
[worker-server]
      |
      | (sends event via NATS) every 15 mins
      ↓
[ NATS MESSAGE BUS ]  <-- acts like a bridge
      ↓
[api-server]
      |
      | (on message received)
      ↓
  Runs storeCryptoStats()
      ↓
  Fetches CoinGecko data
      ↓
  Stores it in MongoDB
```
