﻿


         //Raderar och skapar kalendern
         function getCalendar() {
             $('#fullcalendar').fullCalendar('destroy');
             $('#fullcalendar').fullCalendar('render');

             var idNumber = $('#dropsterMain').val();

             if (idNumber.length < 10)
                 var url = "https://alltbokatwebapi.azurewebsites.net//api/BookingModels";
             else
                 var url = "https://alltbokatwebapi.azurewebsites.net//api/BookingModels/UsersBookings/" + idNumber;

             $.ajax({

                 url: url,

                 type: "Get",

                 success: function (data) {
                     var jsonevents = [];
                     for (var i = 0; i < data.length; i++) {
                         var description = data[i].Description;
                         var begin = data[i].StartTime;
                         var End = data[i].EndTime;
                         var ID = data[i].Id;
                         var Booker = data[i].CustomerName;
                         var bookerEmail = data[i].CustomerEmail;

                         jsonevents[i] = { "title": description, "email": bookerEmail, "start": begin, "BookedBy": Booker, "end": End, "BookingId": ID, "allDay": false };

                     }

                     $('#fullcalendar').fullCalendar({

                         defaultTimedEventDuration: '01:00:00',
                         header: {
                             left: 'prev,next today',
                             center: 'title',
                             right: 'month,agendaWeek,agendaDay'
                         },

                         defaultView: 'month',
                         editable: false,
                         allDaySlot: false,
                         selectable: true,
                         select: function (start, end, jsEvent, view) {
                             if (moment().diff(start, 'days') > 0) {
                                 $('#calendar').fullCalendar('unselect');
                                 // or display some sort of alert
                                 return false;
                             }
                         },
                         slotMinutes: 15,
                         defaultDate: new Date(),
                         timeFormat: {
                             agenda: 'HH:mm'
                         },
                         businessHours: {
                             // days of week. an array of zero-based day of week integers (0=Sunday)
                             dow: [1, 2, 3, 4, 5], // Monday - Friday

                             start: '08:00', // a start time (7am in this example)
                             end: '20:00', // an end time (8pm in this example)

                         },

                         events: jsonevents,

                         eventClick: function (calEvent, jsEvent, view) {

                             var dateTimeStringStart = moment(calEvent.start).format("DD-MM-YYYY HH:mm:ss");
                             var dateTimeStringEnd = moment(calEvent.end).format("DD-MM-YYYY HH:mm:ss");
                             var title = calEvent.title;
                             var bookedBy = calEvent.BookedBy;
                             var bookingId = calEvent.BookingId;
                             var emailUs = calEvent.email;

                             $('#InfoDescription').html(title);
                             $('#InfoTime').html(dateTimeStringStart + " - " + dateTimeStringEnd);
                             $('#InfoEpost').html(emailUs);
                             $('#InfoBookedBy').html(bookedBy);
                             $('#InfoBookingId').html(bookingId);
                             $('#InfoDiv').modal('show');

                         },
                         dayClick: function (date, allDay, jsEvent, view) {

                             var x = date.format();

                             var d = new Date(x);
                             d.setHours(d.getHours() + 1);

                             var view = $('#fullcalendar').fullCalendar('getView');

                             if (view.name === "month") {
                                 $('#fullcalendar').fullCalendar('gotoDate', date);
                                 $('#fullcalendar').fullCalendar('changeView', 'agendaDay');
                             }
                             else {
                                 var bookingHour = d.getHours();
                                 var bookingDay = d.getDay();
                                 
                                 if (bookingDay != 6 && bookingDay != 0) {

                                     if (bookingHour < 11 || bookingHour > 22)
                                     { }
                                     else {
                                         $('#BookingDiv').modal('show');
                                         $('#TID').html(x);
                                         $("#EndingTime").html(d);
                                     }
                                 }
                             }
                         }

                     });

                 },

                 error: function (msg) { alert(msg + "error"); }
             });


         }







//Skapar Bokning
function postFunction() {

    var element = $("#CategoryDropster");
    var Hours = $(':selected', element).attr("Hours");
    var Minutes = $(':selected', element).attr("Minutes");


    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }



    var choosenHour = Hours;
    var choosenMinutes = Minutes;
    var parsedHour = parseInt(choosenHour);
    var parsedMinutes = parseInt(choosenMinutes);
    var startingTime = $("#TID").text();
    var d = new Date(startingTime);


    var timeInAnHour = d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate()) + 'T' + addZero(d.getHours() + parsedHour) + ':' + addZero(d.getMinutes() + parsedMinutes) + ':' + addZero(d.getSeconds());
    var today = new Date;
    var dateToday = new Date(today);
    var timeNow = dateToday.getFullYear() + '-' + addZero(dateToday.getMonth() + 1) + '-' + addZero(dateToday.getDate()) + 'T' + addZero(dateToday.getHours()) + ':' + addZero(dateToday.getMinutes()) + ':' + addZero(dateToday.getSeconds());

    if (timeInAnHour >= timeNow) {
        var reqBooking = {
            CustomerEmail: $("#inputEmail").val(),
            Description: $("#inputDescription").val(),
            ApplicationUserId: $("#dropster :selected").val(), /*Valet av utförare*/
            CustomerName: $("#inputName").val(),
            startTime: startingTime,
            endTime: timeInAnHour /*Ändra till vald category tid*/

        }
        var stringReqdata = JSON.stringify(reqBooking);
        $.ajax({

            url: "https://alltbokatwebapi.azurewebsites.net/api/BookingModels",
            type: "POST",
            data: stringReqdata,
            contentType: 'application/json; charset=utf-8',

            success: function (data) {

                location.reload();

            },

            error: function (msg) { alert(msg + ""); }
        });
    }
    else

        $('#timeErrorDiv').modal('show');
}














    //Hämtar utförare och kallar på funktionen som fyller kalendern
    function calendarStartFunction() {
        getCalendar();
        $.ajax({

            url: "https://alltbokatwebapi.azurewebsites.net/api/ApplicationUsers/",
            type: "Get",

            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    var result = data[i].FirstName + " " + data[i].LastName;
                    var id = data[i].Id;
                    //fyller bokningsfönstrets dropdownmeny
                    $('#dropster').append($('<option>', {
                        value: id,
                        text: result
                    }));
                    //fyller huvudsidans dropdownmeny
                    $('#dropsterMain').append($('<option>', {
                        value: id,
                        text: result

                    }));

                }
            },

            error: function (msg) { alert(msg + "fel"); }
        });
    


//Hämtar categories och kallar på funktionen som skapar och fyller kalendern
$(document).ready(function () {
    getCalendar();
    $.ajax({

        url: "http://localhost:55579/api/CategoryModels",
        type: "Get",

        success: function (data) {

            for (var i = 0; i < data.length; i++) {
                var result = data[i].Name + " " + data[i].Hour + ":" + data[i].Minutes;
                var Hours = data[i].Hour;

                var Minutes = data[i].Minutes;
                //för bokningsfönstrets dropdownmeny
                $('#CategoryDropster').append($('<option>', {
                    Hours: Hours,
                    Minutes: Minutes,
                    text: result

                }));


            }
        },

        error: function (msg) { alert(msg + "fel"); }
    });
});

    }






//Nedanstående funktioner hanterar valideringen på klientsidan vid en Bokning


function validateName()/*kontakt.html: function som körs"onKeyup" när man skriver in ett tecken i namnfältet*/ {

    var name = document.getElementById("inputName").value;/* scannar dokumentet och hämtar värdet av id=commentName"textrutan med namn" och gör detta till en lokal variabel*/

    if (name.length == 0 || name.length > 100)/*om namnet i namnfältet är helt tomt kör koden i if satsen*/ {
        producePrompt("Fill in your name", "commentNamePrompt", "red");/*kör functionen producePrompt, prompten ska visas där variabeln commentNamePrompt finns med färgen röd*/
        return false;
    }
    else if (!name.match(/^[A-Za-z0-9åäöÅÄÖ]*\s{1}[A-Za-z0-9åäöÅÄÖ]*$/))/*else if satsen Körs om namnet inte matchar regex utan innehåller tecken som inte är godkända */ {
        producePrompt("For and lastname", "commentNamePrompt", "red")
        return false;
    }


    else {
        producePrompt("√", "commentNamePrompt", "green")/*Om namnet är ok, körs else och välkomnar avändaren */
        return true;
    }

}

function validateEmail() {
    var email = document.getElementById("inputEmail").value;
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

function validateComment() {
    var comment = document.getElementById("inputDescription").value; /*skapar en lokal variabel av innehållet i kommentarfältet */
    var required = 10; /*Skapar en lokal variabel med värdet 10*/
    var left = required - comment.length; /*skapar en lokal variabel som är värdet av det krävda antalet tecken minus det antal som angivits */


    if (left > 0) {  /* Om left(kvarvarande krävda tecken) är större än noll körs if satsen annars godkänns kommentaren och else satsen körs*/
        producePrompt("At least " + left + " more signs are needed", "commentMessagePrompt", "red");
        return false;
    }

    else {


        producePrompt("√", "commentMessagePrompt", "green");
        if (comment.length < 100) {
            return true;
        }
        else {
            producePrompt("Error, message to long to send", "commentMessagePrompt", "red");
            return false;
        }
    }
}

function producePrompt(message, promptLocation, color) {

    document.getElementById(promptLocation).innerHTML = message; /*promptlocation är vart prompten visas, innerHtml sätts lika med medelandet från variabeln message*/
    document.getElementById(promptLocation).style.color = color;/*skannar dokumentet igen och sätter färgen vi skickat med i variablen*/
}

function validateCommentForm() {

    if (validateName() && validateEmail() && validateComment())/*Om någon av valideringsfunktionerna INTE retunerar true körs if satsen*/ {
        postFunction();
    }

}