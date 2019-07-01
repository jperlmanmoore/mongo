$(document).ready(function () {
//     console.log("document ready");
    // Whenever someone clicks the #scrape button
    $('#scrape').on('click', () => {
     
    console.log("scrape clicked");

        fetch("/api/Article", {method: "GET"}).then(() => window.location.replace("/api/Article"))
    });


     $('#saved').on('click', ()=> {
         console.log("saved clicked");

         let saved = {
             title,
             summary,
             link
         };

         fetch('api/')
     })

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
