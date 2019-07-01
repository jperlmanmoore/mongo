const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const db = require('../models')

module.exports = app => {
    app.get("/", (req, res) => {
        console.log("render index")
      res.render("index", { title: 'Newsweek News Scrapper' });
    });

    app.get("/savedArticles", (req, res) => {
        console.log("render saved")
      res.render("savedArticles", { title: 'Newsweek News Scrapper' });
    });

    app.get("/scrapeArticles", (req, res) => {
        console.log("render scrape")
      res.render("scrapeArticles", { title: 'Newsweek News Scrapper' });
    });

    // app.get("/clearArticles", (req, res) => {
    //     console.log(1400)
    //   res.render("scrapeArticles", { title: 'Newsweek News Scrapper' });
    // });


// Routes
// A GET route for scraping the newsWeek website
app.get("/search", function(req, res) {
  console.log(1000)
    // First, we grab the body of the html with axios
    axios.get("https://www.newsweek.com/newsfeed")
    .then(response => {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);

      let hbsObject = {
        data: []
      };
      // Now, we grab every h3 within an article tag, and do the following:
      $("article").each((i, element) => {

        const inner = $(element).children('.inner');

        if (inner) {
        
        // Save an empty result object
          hbsObject.data.push({
            title: $(element).children('h3').children('a').text(),
            link: $(element).children('h3').children('a').attr('href'),
            summary: $(element).children('h3').children('.summary').text()
          })
        }
    });
    res.render('scrapeArticles', hbsObject);
  });
  
  // Route for getting all Articles from the db
  app.get("/article", function(req, res) {
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
  app.post("/article/:id", function(req, res) {
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

});



}
