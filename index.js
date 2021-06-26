const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());

MongoClient.connect('mongodb+srv://user001:user001-mongodb-basics@practice.54zqw.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true}, (err, client) => {
    if (err) throw err;
    console.log('Database Connected');
    const dbProduct = client.db('product');
    const beansCollection = dbProduct.collection('beans');
    
    app.post('/beans', (req, res) => {
        if (!req.body.name) return res.status(400).send('Must have name');
        if (!Number.isInteger(req.body.qty)) return res.status(400).send('Quantity must be an Integer');

        const bean = {
            name: req.body.name,
            qty: req.body.qty
        };
        beansCollection.insertOne(bean);
        res.send(bean);
    });

    app.get('/beans', (req, res) => {
        dbProduct.collection('beans').find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`)); 
