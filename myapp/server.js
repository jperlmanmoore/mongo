const express = require("express");
// const path = require('path');
const mongoose = require("mongoose");
const PORT = 3600;

// const MongoClient = require('mongodb').MongoClient;  
// const db_url = 'mongodb://localhost:mongo'
const exphbs = require("express-handlebars");

// Initialize Express
const app = express();

require('./models');
require('./routes/index')(app);

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));

// require('./routes/index')(app);
// require('./models');


// Connect to the Mongo DB
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds343127.mlab.com:43127/heroku_tn9n8dlq',
  { useNewUrlParser: true },
  function(err) {
    if (err) throw err;
    console.log("Connected successfully to server");
    app.listen(PORT, () => console.log('Listening on port %s', PORT));

  });

  // Start the server

  

