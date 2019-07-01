const db = require('./models')
const axios = require('axios');
const cheerio = require('cheerio')
// import { Article, Note } from './models';
// import { get } from "axios";
// import { load } from "cheerio";

console.log(900);

modules.exports = app => {
// Routes
// A GET route for scraping the newsWeek website
app.get("/scrape", function(req, res) {
  console.log(1000)
    // First, we grab the body of the html with axios
    axios.get("https://www.newsweek.com/newsfeed").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h3 within an article tag, and do the following:
      $("article").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(element)
          .children("a")
          .text();
        result.link = $(element)
          .children("a")
          .attr("href");
          result.summary = $(element)
          .children("a")
          .attr(".summary");
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });
  
  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(data) {
        // If we were able to successfully find Articles, send them back to the client
        const hbsResultsObj = {
          Article: data
        };
        console.log(hbsResultsObj);
        res.render("index", hbsResultsObj)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  
  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

};