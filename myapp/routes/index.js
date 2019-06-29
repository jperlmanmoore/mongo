
var express = require("express");
var router = express.Router();

  
 router.get("/", (req, res) => {
        console.log(700)
      res.render("index");
  });

 router.get("/index", (req, res) => {
    res.render("index");
});
  
   console.log("htmlRoutes available");

   module.exports = router;