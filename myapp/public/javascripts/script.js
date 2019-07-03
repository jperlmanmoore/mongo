$(document).ready(function () {
    console.log("clicks");
    // Whenever someone clicks the #scrape button
    $(document).on('click', '#scrapeArticles', () => {
        console.log("scrape clicked");

        $.ajax("/search", {
            type: "GET",
            dataType: 'json',
            
            success: response => console.log("ajax response search")
            })
        .then(
            $.ajax('/articles', {
                type: "GET",
                dataType: "json",
                success: response => {
                    console.log(response.data, "response.data")
           }
        })
        );
        
    });

    $('#bothButtons').on('click', '#saved', function (element) {
        console.log("saved clicked");

        const $card = $(this).closest('.card');
        const title = $card.find('.title').text();
        const summary = $card.find('.summary').text();
        const link = $card.find('.link').text();


        let saved = {
            title,
            summary,
            link,
            note: null
        }
        console.log(saved);

        //  fetch('/api/articles', {
        //     method: 'POST',
        //     body: JSON.stringify(saved)
        //  }).then((response) => {
        //     console.log(response)

    });

    $('#bothButtons').on('click', 'savedArticles', function () {
        console.log("show saved button clicked");
        fetch("/api/articles", {
            method: "GET"
        }).then(() => window.location.replace("/api/search"))
    });

    $('#saveNote').on('click', function () {
        let savedNote = $('#textarea1').val().trim();

        let savedNoteObj = {
            body: {
                body: savedNote
            }
        };

        fetch('/api/Notes', {
            method: 'POST',
            body: JSON.stringify(savedNoteObj)
        }).then(response => {
            location.reload()
        });
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