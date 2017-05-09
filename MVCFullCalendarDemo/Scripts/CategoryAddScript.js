function categoryPostFunction() {
    if (validateNewJobCategoryInput()) {
        var name = $("#Name").val();
        var hours = $("#dropHours").val();
        var minutes = $("#dropMinutes").val();

        var reqdata = {
            Name: name,
            Hour: hours,
            Minutes: minutes
        }

        var stringReqdata = JSON.stringify(reqdata);

        $.ajax({

            url: "http://localhost:55579/api/CategoryModels",
            type: "POST",
            data: stringReqdata,
            contentType: 'application/json; charset=utf-8',

            success: function (data) {
                $('#successModal').modal('show');
            },

            error: function () { $('#errorModal').modal('show'); }
        });

    }
}

