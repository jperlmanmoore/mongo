module.exports = app => {
    app.get("/", (req, res) => {
        console.log(700)
      res.render("index", { title: 'Newsweek News Scrapper' });
    });

    app.get("/savedArticles", (req, res) => {
        console.log(800)
      res.render("savedArticles", { title: 'Newsweek News Scrapper' });
    });

    app.get("/scrapeArticles", (req, res) => {
        console.log(800)
      res.render("scrapeArticles", { title: 'Newsweek News Scrapper' });
    });

    app.get("/clearArticles", (req, res) => {
        console.log(800)
      res.render("scrapeArticles", { title: 'Newsweek News Scrapper' });
    });


}
