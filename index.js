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
        const bean = req.body;
        if (!req.body.name) res.status(400).send('Must have name');
        else if (!req.body.qty.isInteger) res.status(400).send('Quantity must be an Integer');
        beansCollection.insertOne(req.body);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`)); 
