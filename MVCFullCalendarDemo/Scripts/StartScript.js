
//updates the database with the new pictureUrl on the start page.
function updatePictureFunction() {
    if (validateNewPictureUrlInput()) {
        $.ajax({

            url: "https://alltbokatwebapi2.azurewebsites.net/api/VisualSettingsModels",
            type: "Get",
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                    var BootstrapUrlETT = data[i].BootStrapUrl;
                    var ThemeNameETT = data[i].ThemeName;
                    var PictureUrlETT = data[i].PictureUrl;
                    var StartTextETT = data[i].StartText;

                    PutPictureFunction(BootstrapUrlETT, ThemeNameETT, PictureUrlETT, StartTextETT);
                }
            },

            error: function (msg) { alert(msg + "startfel"); }
        });


        function PutPictureFunction(BootstrapUrlETT, ThemeNameETT, PictureUrlETT, StartTextETT) {

            var newPictureUrl = document.getElementById("newPictureUrlInput").value;

            var reqdata = {
                id: 1,
                ThemeName: ThemeNameETT,
                BootStrapUrl: BootstrapUrlETT,
                PictureUrl: newPictureUrl,
                StartText: StartTextETT
            }

            var stringReqdata = JSON.stringify(reqdata);
            $.ajax({

                url: "https://alltbokatwebapi2.azurewebsites.net/api/VisualSettingsModels/1",
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',

                data: stringReqdata,

                success: function (data) {
                    console.log(data);
                    refreshFunction();

                    $('#successModal').modal('show');
                },
                error: function () { $('#errorModal').modal('show'); }
            });
        };
    }
}
//updates the new text on the start page
function updateStartTextFunction() {
    if (validateNewStartTextInput()) {
        $.ajax({

            url: "https://alltbokatwebapi2.azurewebsites.net/api/VisualSettingsModels",
            type: "Get",
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                    var BootstrapUrlETT = data[i].BootStrapUrl;
                    var ThemeNameETT = data[i].ThemeName;
                    var PictureUrlETT = data[i].PictureUrl;
                    var StartTextETT = data[i].StartText;
                    PutTextFunction(BootstrapUrlETT, ThemeNameETT, PictureUrlETT, StartTextETT);
                }
                $('#successModal').modal('show');

            },

            error: function (msg) { alert(msg + "startfel"); }
        });


        function PutTextFunction(BootstrapUrlETT, ThemeNameETT, PictureUrlETT, StartTextETT) {

            var newStartText = document.getElementById("newStartTextInput").value;
            var reqdata = {
                id: 1,
                ThemeName: ThemeNameETT,
                BootStrapUrl: BootstrapUrlETT,
                PictureUrl: PictureUrlETT,
                StartText: newStartText
            }

            var stringReqdata = JSON.stringify(reqdata);
            $.ajax({

                url: "https://alltbokatwebapi2.azurewebsites.net/api/VisualSettingsModels/1",
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',

                data: stringReqdata,

                success: function (data) {
                    console.log(data);
                    refreshFunction();
                    $('#newStartTextInput').val('');
                    $('#successModal').modal('show');

                },
                error: function () { $('#errorModal').modal('show'); }
            });
        };
    }
}
function refreshFunction() {
    $.ajax({

        url: "https://alltbokatwebapi2.azurewebsites.net/api/VisualSettingsModels",
        type: "Get",

        success: function (data) {

            for (var i = 0; i < data.length; i++) {
                var picUrl = data[i].PictureUrl;
                var startTextString = data[i].StartText;


                document.getElementById('testbild').setAttribute('src', picUrl)
                document.getElementById('startText').innerHTML = startTextString;
                $('#newPictureUrlInput').val('');
            }
        },

        error: function (msg) { alert(msg + "startfel"); }
    });
}