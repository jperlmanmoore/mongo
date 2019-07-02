const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models')

module.exports = app => {
    app.get("/", (req, res) => {
        console.log("render index")
      res.render("index", { title: 'Newsweek News Scrapper' });
    });


// Routes
// A GET route for scraping the newsWeek website
app.get("/search", function(req, res) {
  console.log(1000)
    // First, we grab the body of the html with axios
    axios.get("https://www.newsweek.com/newsfeed")
    .then(response => {
      console.log(response.data);
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
  app.get("/api/articles", function(req, res) {
    console.log("article route")
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
  app.post("/api/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.insertOne({
      title: req.body.title,
      summary: req.body.summary,
      link: req.body.link}
      , function(err, result) {
        if (err) return res.send('Error');
        res.send('Article added');
      });
    });
      

    // Route for saving/updating an Article's associated Note
  app.post("/api/note/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.insertOne({
      title: req.body.title,
      note: req.body.note,
    }, function(err, result) {
        if (err) return res.send('Error');
        res.send('Article added');
      });
    });

    // get article route

});

}
