const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const {CONNECTION, PORT} = require('../config/index')

const app = express();

mongoose.connect(`mongodb+srv://smakolyky-shop:${CONNECTION}@cluster0.3odrx.mongodb.net/test`, {useUnifiedTopology: true, useNewUrlParser: true });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log(`Connected to db!`));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
