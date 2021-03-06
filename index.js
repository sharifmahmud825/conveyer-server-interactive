const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

// connect to db
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bx2ul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(uri);

async function run() {
  try {
    await client.connect();
    console.log('connected');
    const database = client.db('deliveryCollection');
    const orders = database.collection('orders');
    const finalOrder = database.collection('finalOrders');
    // Post Api
    // app.post('/service', (req, res) => {
    //   // orders.insertOne(req.body).then((result) => {
    //   //   res.send(result.insertedId);
    //   const cursor = req.body;
    //   const result = await orders.insertOne(cursor);
    //   res.json(result.insertedId);
    // });
    // get Api
    app.get('/services', async (req, res) => {
      const cursor = orders.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // Post Api
    app.post('/orders', async (req, res) => {
      const order = req.body;
      console.log(order);
      const result = await finalOrder.insertOne(order);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('conveyer server running');
});

app.listen(port, () => {
  console.log(port);
});
