using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCFullCalendarDemo.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Register()
        {
            return View();
        }
        public ActionResult CategoryAdd()
        {
            return View();
        }

        public ActionResult VisualSettings()
        {
            return View();
        }

        public ActionResult Start()
        {
            return View();
        }

    }
}