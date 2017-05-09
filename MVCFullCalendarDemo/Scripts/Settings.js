

function getActiveCss() {

    $.ajax({

        url: "http://localhost:55579/api/VisualSettingsModels",
        type: "Get",

        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                var bootStrapUrl = data[i].BootStrapUrl;
                var themeName = data[i].ThemeName;

                changeCSS(bootStrapUrl, 0);



            }
        },

        error: function (msg) { alert(msg + "fel"); }
    });
}



function changeCSS(cssFile, cssLinkIndex) {



    $.ajax({

        url: "http://localhost:55579/api/VisualSettingsModels",
        type: "Get",

        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                var pictureurl = data[i].PictureUrl;
                var starttext = data[i].StartText;
                SETActiveCss(pictureurl, starttext);




            }
        },

        error: function (msg) { alert(msg + "fel"); }
    });







    function SETActiveCss(PICTUREURL, STARTTEXT) {

        var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFile);

        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);




        var bootStrapUrl = cssFile;
        var themeName = "ExempelName";
        var Id = 1;
        var pictureurl = PICTUREURL;
        var starttext = STARTTEXT;



        var reqdata = {
            id: Id,
            ThemeName: themeName,
            BootStrapUrl: bootStrapUrl,
            StartText: starttext,
            PictureUrl: pictureurl
        }

        var stringReqdata = JSON.stringify(reqdata);

        $.ajax({

            url: "http://localhost:55579/api/VisualSettingsModels/1",
            type: "PUT",
            data: stringReqdata,
            contentType: 'application/json; charset=utf-8',

            success: function (data) {               
               
            },

            error: function (msg) { alert(msg + ""); }
        });


    }
}





// validation functions

function validateNewJobCategoryInput() {
    var comment = document.getElementById("newJobCategoryInput").value; /*skapar en lokal variabel av innehållet i kommentarfältet */

    if (comment.length < 50 && comment.length > 0) {
        producePrompt("√", "commentNewCategoryInputPrompt", "green");
        return true;
    }
    else {
        producePrompt("Please fill in a valid title name", "commentNewCategoryInputPrompt", "red");
        return false;
    }
}


function validateNewPictureUrlInput() {
    var comment = document.getElementById("newPictureUrlInput").value; /*skapar en lokal variabel av innehållet i kommentarfältet */

    if (comment.length < 300 && comment.length > 0) {
        producePrompt("√", "commentNewPictureUrlInputPrompt", "green");
        return true;
    }
    else {
        producePrompt("Please fill in a valid Url", "commentNewPictureUrlInputPrompt", "red");
        return false;
    }
}


function validateNewStartTextInput() {
    var comment = document.getElementById("newStartTextInput").value; /*skapar en lokal variabel av innehållet i kommentarfältet */

    if (comment.length < 300 && comment.length > 0) {
        producePrompt("√", "commentNewStartTextInputPrompt", "green");
        return true;
    }
    else {
        producePrompt("Please fill in a valid text", "commentNewStartTextInputPrompt", "red");
        return false;
    }
}


function producePrompt(message, promptLocation, color) {

    document.getElementById(promptLocation).innerHTML = message; /*promptlocation är vart prompten visas, innerHtml sätts lika med medelandet från variabeln message*/
    document.getElementById(promptLocation).style.color = color;/*skannar dokumentet igen och sätter färgen vi skickat med i variablen*/
}







function validateBookingCommentForm() {

    if (validateBookingName() && validateBookingEmail() && validateBookingComment())/*Om någon av valideringsfunktionerna INTE retunerar true körs if satsen*/ {
        postFunction();
    }

}