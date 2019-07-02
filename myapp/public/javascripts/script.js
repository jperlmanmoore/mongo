$(document).ready(function () {
     console.log("clicks");
    // Whenever someone clicks the #scrape button
    $('#scrape').on('click', () => {
    console.log("scrape clicked");
        fetch("/api/search", {method: "GET"}).then(() => window.location.replace("/api/search"))
    });


     $('#saved').on('click', function(element) {
         console.log("saved clicked");

         let title = $(this).class('title').text();
         let summary = $(this).class('summary').text();
         let link = $(this).class('link').text();

         let saved= {
             title,
             summary,
             link,
             note: null
         }

         fetch('api/articles', {
            method: 'POST',
            body: JSON.stringify(saved)
         }).then((response) => {
            console.log(response)
         
     });

     $('#savedArticles').on('click', function() {
         console.log("show saved button clicked");
         fetch("/api/articles", {method: "GET"}).then(() => window.location.replace("/api/search"))
     });

     $('#saveNote').on('click', function() {
        let savedNote = $('#textarea1').val().trim();

        let savedNoteObj = {
            body: {
                body: savedNote
            }
        };

        fetch('/api/Notes', {
            method: 'POST',
            body: JSON.stringify(savedNoteObj)
        }).then(response => {location.reload()});
     });

    //  delete articles





    // Whenever someone clicks the #scrape button
    // $(document).on("click", '#saved', function (e) {
    //     e.preventDefault();
      
    //     // Now make an ajax call for the Article
    //     $.ajax({
    //       method: "GET",
    //       url: "/articles",
    //       dataType: 'json',
    //       success: function (response) {
    //         console.log(response);
    //       }
    //     });
    //   });
  
  
    });
})
