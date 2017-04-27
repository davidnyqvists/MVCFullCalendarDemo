﻿ //updates the database with the new pictureUrl on the start page
        function updatePictureFunction() {
                     
            $.ajax({

                url: "http://localhost:55579/api/VisualSettingsModels",
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
            
            
           function PutPictureFunction(BootstrapUrlETT, ThemeNameETT, PictureUrlETT, StartTextETT){

               var newPictureUrl = document.getElementById("pictureUrl").value;

                var reqdata = {
                    id: 1,
                    ThemeName: ThemeNameETT,
                    BootStrapUrl: BootstrapUrlETT,
                    PictureUrl: newPictureUrl,
                    StartText: StartTextETT
                }

                var stringReqdata = JSON.stringify(reqdata);
                $.ajax({

                    url: "http://localhost:55579/api/VisualSettingsModels/1",
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',

                    data: stringReqdata,

                    success: function (data) {
                        console.log(data);
                        refreshFunction();
                    },
                    error: function (msg) { alert(msg + "startfel"); }
                });
           };
        }

            //updates the new text on the start page
           function updateStartTextFunction() {
               $.ajax({

                   url: "http://localhost:55579/api/VisualSettingsModels",
                   type: "Get",
                   success: function (data) {

                       for (var i = 0; i < data.length; i++) {

                           var BootstrapUrlETT = data[i].BootStrapUrl;
                           var ThemeNameETT = data[i].ThemeName;
                           var PictureUrlETT = data[i].PictureUrl;
                           var StartTextETT = data[i].StartText;
                          
                           PutTextFunction(BootstrapUrlETT, ThemeNameETT, PictureUrlETT, StartTextETT);
                       }
                   },

                   error: function (msg) { alert(msg + "startfel"); }
               });


               function PutTextFunction(BootstrapUrlETT, ThemeNameETT, PictureUrlETT, StartTextETT) {                 

                   var newStartText = document.getElementById("startTextLabel").value;

                   var reqdata = {
                       id: 1,
                       ThemeName: ThemeNameETT,
                       BootStrapUrl: BootstrapUrlETT,
                       PictureUrl: PictureUrlETT,
                       StartText: newStartText
                   }

                   var stringReqdata = JSON.stringify(reqdata);
                   $.ajax({

                       url: "http://localhost:55579/api/VisualSettingsModels/1",
                       type: 'PUT',
                       contentType: 'application/json; charset=utf-8',
                       dataType: 'json',

                       data: stringReqdata,

                       success: function (data) {
                           console.log(data);
                           refreshFunction();
                       },
                       error: function (msg) { alert(msg + "startfel"); }
                   });
               };
           }
         
           function refreshFunction()
           {
               $.ajax({

                   url: "http://localhost:55579/api/VisualSettingsModels",
                   type: "Get",

                   success: function (data) {

                       for (var i = 0; i < data.length; i++) {
                           var picUrl = data[i].PictureUrl;
                           var startTextString = data[i].StartText;


                           document.getElementById('testbild').setAttribute('src', picUrl)
                           document.getElementById('startText').innerHTML = startTextString;
                       }
                   },

                   error: function (msg) { alert(msg + "startfel"); }
               });
           }