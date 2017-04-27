function validateFirstName()/*kontakt.html: function som körs"onKeyup" när man skriver in ett tecken i namnfältet*/ {

    var name = document.getElementById("FirstName").value;

    if (name.length == 0 || name.length > 100)/*om namnet i namnfältet är helt tomt kör koden i if satsen*/ {
        producePrompt("Fill in your firstname", "commentFirstNamePrompt", "red");/*kör functionen producePrompt, prompten ska visas där variabeln commentNamePrompt finns med färgen röd*/
        return false;
    }
    else if (!name.match(/^[A-Za-z0-9åäöÅÄÖ]*$/))/*else if satsen Körs om namnet inte matchar regex utan innehåller tecken som inte är godkända */ {
        producePrompt("Fill in your firstname", "commentFirstNamePrompt", "red")
        return false;
    }

    else {
        producePrompt("√", "commentFirstNamePrompt", "green")/*Om namnet är ok, körs else och välkomnar avändaren */
        return true;
    }

}

function validateLastName()/*kontakt.html: function som körs"onKeyup" när man skriver in ett tecken i namnfältet*/ {

    var name = document.getElementById("LastName").value;

    if (name.length == 0 || name.length > 100)/*om namnet i namnfältet är helt tomt kör koden i if satsen*/ {
        producePrompt("Fill in your Lastname", "commentLastNamePrompt", "red");/*kör functionen producePrompt, prompten ska visas där variabeln commentNamePrompt finns med färgen röd*/
        return false;
    }
    else if (!name.match(/^[A-Za-z0-9åäöÅÄÖ]*$/))/*else if satsen Körs om namnet inte matchar regex utan innehåller tecken som inte är godkända */ {
        producePrompt("Fill in your Lastname", "commentLastNamePrompt", "red")
        return false;
    }

    else {
        producePrompt("√", "commentLastNamePrompt", "green")/*Om namnet är ok, körs else och välkomnar avändaren */
        return true;
    }

}

function validateUserName()/*kontakt.html: function som körs"onKeyup" när man skriver in ett tecken i namnfältet*/ {

    var name = document.getElementById("UserName").value;

    if (name.length == 0 || name.length > 100)/*om namnet i namnfältet är helt tomt kör koden i if satsen*/ {
        producePrompt("Fill in your Username", "commentUserNamePrompt", "red");/*kör functionen producePrompt, prompten ska visas där variabeln commentNamePrompt finns med färgen röd*/
        return false;
    }
    else if (!name.match(/^[A-Za-z0-9åäöÅÄÖ]*$/))/*else if satsen Körs om namnet inte matchar regex utan innehåller tecken som inte är godkända */ {
        producePrompt("Fill in your Username", "commentUserNamePrompt", "red")
        return false;
    }

    else {
        producePrompt("√", "commentUserNamePrompt", "green")/*Om namnet är ok, körs else och välkomnar avändaren */
        return true;
    }

}

function validateEmail() {
    var email = document.getElementById("Email").value;
    if (email.length == 0 || email.length > 100) {
        producePrompt("E-mail is missing", "commentEmailPrompt", "red");/*Om inget är ifyllt i epost efterfrågas detta med hjälp av ett anrop till vår produceprompt function*/
        return false;
    }

    else if (!email.match(/^[A-Za-z\._\-0-9]*[@@][A-Za-z]*[\.][a-z]{2,4}$/))/*Om mail har andra tecken än de vi angivit i regex körs else if*/ {
        producePrompt("Unvalid E-mail", "commentEmailPrompt", "red")
        return false;
    }

    else {
        producePrompt("√", "commentEmailPrompt", "green")/*Mailen är godkänd och else satsen körs*/
        return true;

    }
}

function validatePassword()/*kontakt.html: function som körs"onKeyup" när man skriver in ett tecken i fältet*/ {

    var password = document.getElementById("Password").value;

    if (password.length <= 5 || name.length > 100)/*om namnet i namnfältet är helt tomt kör koden i if satsen*/ {
        producePrompt("The password need to be atleast 6 signs long", "commentPasswordPrompt", "red");/*kör functionen producePrompt, prompten ska visas där variabeln commentNamePrompt finns med färgen röd*/
        return false;
    }

    else {
        producePrompt("√", "commentPasswordPrompt", "green")/*Om namnet är ok, körs else och välkomnar avändaren */
        return true;
    }

}

function validateConfirmPassword()/*kontakt.html: function som körs"onKeyup" när man skriver in ett tecken i fältet*/ {

    var password = document.getElementById("ConfirmPassword").value;

    if (password.length <= 5 || name.length > 100)/*om namnet i namnfältet är helt tomt kör koden i if satsen*/ {
        producePrompt("The password need to be atleast 6 signs long", "commentConfirmPasswordPrompt", "red");/*kör functionen producePrompt, prompten ska visas där variabeln commentNamePrompt finns med färgen röd*/
        return false;
    }

    else {
        producePrompt("√", "commentConfirmPasswordPrompt", "green")/*Om namnet är ok, körs else och välkomnar avändaren */
        return true;
    }

}

function producePrompt(message, promptLocation, color) {

    document.getElementById(promptLocation).innerHTML = message; /*promptlocation är vart prompten visas, innerHtml sätts lika med medelandet från variabeln message*/
    document.getElementById(promptLocation).style.color = color;/*skannar dokumentet igen och sätter färgen vi skickat med i variablen*/
}

function validateCommentForm() {


    if (validateFirstName()) {
        if (validateLastName()) {
            if (validateUserName()) {
                if (validateEmail()) {
                    if (validatePassword()) {
                        if (validateConfirmPassword()) {
                            registerPostFunction();
                        }

                    }


                }
            }
        }
    }
}


function registerPostFunction() {

    var email = $("#Email").val();
    var password = $("#Password").val();
    var confirmPassword = $("#ConfirmPassword").val();
    var firstName = $("#FirstName").val();
    var lastName = $("#LastName").val();
    var userName = $("#UserName").val();

    var reqdata = {
        Password: password,
        ConfirmPassword: password,
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        UserName: userName
    }

    var stringReqdata = JSON.stringify(reqdata);

    $.ajax({

        url: "https://alltbokatwebapi.azurewebsites.net/api/Account/Register",
        type: "POST",
        data: stringReqdata,
        contentType: 'application/json; charset=utf-8',

        success: function (data) {

        },

        error: function (msg) { alert(msg + ""); }
    });

}