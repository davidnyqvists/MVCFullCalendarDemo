using System.Web;
using System.Web.Configuration;
using System.Web.Optimization;

namespace MVCFullCalendarDemo
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            //jQuery fullcalendar plugin css
            bundles.Add(new StyleBundle("~/Content/fullcalendar").Include(
                     "~/Content/fullcalendar.css"));




            //jQuery fullcalendar plugin js
            bundles.Add(new ScriptBundle("~/bundles/fullcalendar").Include(
                      "~/Scripts/moment.js",
                      "~/Scripts/fullcalendar.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include("~/Content/bootstrap.css"));

            bundles.Add(new ScriptBundle("~/bundles/visualsetting").Include(
                     "~/Scripts/visualSetting.js"
                    ));




        }
    }
}