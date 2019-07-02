const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models')

console.log("scraping route");

module.exports = app => {
  app.get("/", (req, res) => {
    console.log("render index")
    res.render("index", {
      title: 'Newsweek News Scrapper'
    });
  });


  // Routes
  // A GET route for scraping the newsWeek website
  app.get("/search", function (req, res) {
    console.log("cheerio search");
    // First, we grab the body of the html with axios
    axios.get("https://www.newsweek.com/newsfeed")
      .then((response) => {
        // console.log(response.data);
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);
        // console.log($);
        // Now, we grab every h3 within an article tag, and do the following:
        $("article").each((i, element) => {
          const result = {};
          console.log(result);
          result.title = $(this).children('.inner').children('h3').children('a').text();
          result.link = $(this).children('.inner').children('h3').children('a').attr('href');
          result.summary = $(this).children('.inner').children('.summary').text();
          console.log(result.title);

          
          db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          });
        });
        res.render('index');
      });

    // Route for getting all Articles from the db
    app.get("/api/articles", function (req, res) {
      console.log("article route")
      // Grab every document in the Articles collection
      db.Article.find({})
        .then(function (data) {
          // If we were able to successfully find Articles, send them back to the client
          const hbsResultsObj = {
            Article: data
          };
          console.log(hbsResultsObj);
          res.render("index", hbsResultsObj)
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/api/articles/:id", function (req, res) {
      // Create a new note and pass the req.body to the entry
      db.insertOne({
        title: req.body.title,
        summary: req.body.summary,
        link: req.body.link
      }, function (err, result) {
        if (err) return res.send('Error');
        res.send('Article added');
      });
    });


    // Route for saving/updating an Article's associated Note
    app.post("/api/note/:id", function (req, res) {
      // Create a new note and pass the req.body to the entry
      db.insertOne({
        title: req.body.title,
        note: req.body.note,
      }, function (err, result) {
        if (err) return res.send('Error');
        res.send('Article added');
      });
    });

    // get article route

  });

}