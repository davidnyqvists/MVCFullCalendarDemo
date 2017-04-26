



function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);




    var bootStrapUrl = cssFile;
    var themeName = "ExempelName";
    var Id = 1;



    var reqdata = {
        id: Id,
        ThemeName: themeName,
        BootStrapUrl: bootStrapUrl
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



            //function setActiveCss(cssFile, name) {


            //    var bootStrapUrl = cssFile;
            //    var themeName = name;
            //    var Id = 1;

            //    var reqdata = {
            //        id=Id,
            //        ThemeName: themeName,
            //        BootStrapUrl: bootStrapUrl

            //    }


            //    var stringReqdata = JSON.stringify(reqdata);

            //    $.ajax({

            //        url: "http://localhost:55579/api/VisualSettingsModels/1",
            //        type: "POST",
            //        data: stringReqdata,
            //        contentType: 'application/json; charset=utf-8',

            //        success: function (data) {

            //        },

            //        error: function (msg) { alert(msg + ""); }
            //    });

            //}



