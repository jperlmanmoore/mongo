
    // Grab the articles as a json
    // $.getJSON("/Article", data => {
    //   // For each one
    //   for (var i = 0; i < data.length; i++) {
    //     // Display the apropos information on the page
    //     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    //   }
    // });
    console.log(1100);
    // Whenever someone clicks the #scrape button
    $("#scrape").on("click", function (e) {
      e.preventDefault();
    
      // Now make an ajax call for the Article
      $.ajax({
        method: "GET",
        url: "/articles",
        dataType: 'json',
        success: function (response) {
          console.log(response);
          const hbsObjArticle = response.results;
          console.log(hbsObjArticle);
        }
      });
    });

    // Whenever someone clicks the #scrape button
    $('#saved').on("click", function (e) {
        e.preventDefault();
      
        // Now make an ajax call for the Article
        $.ajax({
          method: "GET",
          url: "/articles",
          dataType: 'json',
          success: function (response) {
            console.log(response);
          }
        });
      });
  
  

  