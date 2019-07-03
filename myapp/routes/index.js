const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models/index')

module.exports = app => {

  // needs to go to separate routes file -- renders to handlebars
  app.get("/", (req, res) => {
    console.log("render index")
    res.render("index", {
      title: 'Newsweek News Scraper'
    }, );
  });


  // app.get("/", (req, res) => {
  //   console.log("render articles on index")
  //   res.render("index", {
  //     articles: db.ARticles
  //   }, );
  // });

  // Routes
  // A GET route for scraping the newsWeek website
  app.get("/search", function (req, res) {
    console.log("cheerio search");
    // First, we grab the body of the html with axios
    axios.get("https://www.newsweek.com/newsfeed")
      .then(response => {
        // console.log(response.data);
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);
        // console.log($);
        const articleArray = [];
        // console.log(articleArray);
        // Now, we grab every h3 within an article tag, and do the following:
        $("article .inner").each(function (i, element) {
          let result = {}
          // console.log(result);
          result.title = $(this).children('h3').children('a').text();
          result.link = $(this).children('h3').children('a').attr('href');
          result.summary = $(this).children('.summary').text();
          // console.log(result.title, result.link, result.summary);

          db.Article.create(result)
            .then(function (dbArticle) {
              console.log(dbArticle)
            });
        });
      });
  });


  // Route for getting all Articles from the db
  app.get("/articles", function (req, res) {
    console.log("articles get route");
    db.Article.find({}).sort({
        _id: -1
      })
      .exec(function (err, art) {
        if (err) {
          console.log(err);
        } else {
          res.render('index', {
            articles: db.Articles
          });
          console.log("db.ARticles");
        }
      })
  });




  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function (req, res) {
    db.Article.findOne({
        _id: req.params.id
      })
      .populate("note")
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
      .then(function (dbNote) {
        return db.Article.findOneAndUpdate({
          _id: req.params.id
        }, {
          note: dbNote._id
        }, {
          new: true
        });
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  // get article route


};