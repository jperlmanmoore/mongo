
var express = require("express");
var router = express.Router();

  
 router.get("/", (req, res) => {
        console.log(700)
      res.render("index", { title: 'Newsweek News Scrapper' });
  });

 router.get("/index", (req, res) => {
    res.render("index");
});
  

   module.exports = router;


