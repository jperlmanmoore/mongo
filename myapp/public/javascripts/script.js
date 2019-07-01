
    // Grab the articles as a json
    $.getJSON("/articles", data => {
      // For each one
      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        return hbsObject
      }
    });
    
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
        }
      });
    });
  
  

  