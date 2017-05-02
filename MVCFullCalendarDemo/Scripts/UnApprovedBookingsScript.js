
function getUnApprovedBookingsFunction() {
    $.ajax({

        url: "https://alltbokatwebapi.azurewebsites.net/api/ApplicationUsers/",
        type: "Get",

        success: function (data) {
            $('#dropsterUnapprovedBookings').empty();
            //GetNOTWithinTimeRange(DateTime startTime, DateTime endTime);
            for (var i = 0; i < data.length; i++) {
                //if(id!=variabel)
                var result = data[i].FirstName + " " + data[i].LastName;
                var id = data[i].Id;

                //fyller bokningsfönstrets dropdownmeny
                $('#dropsterUnapprovedBookings').append($('<option>', {
                    value: id,
                    text: result
                }));

            }
        },

        error: function (msg) { alert(msg + "fel"); }
    });

}