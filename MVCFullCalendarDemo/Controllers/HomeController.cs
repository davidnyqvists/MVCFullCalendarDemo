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
        public ActionResult IndexLoggedIn()
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

        public ActionResult Settings()
        {

            return View();

        }

        public ActionResult Start()
        {
            return View();
        }
        public ActionResult StartLoggedIn()
        {
            return View();
        }
        public ActionResult LogIn()
        {
            return View();
        }

        public ActionResult LogInError()
        {
            ViewBag.Message = "You have to log in to access the requested page";
            return View("LogIn");
        }

        public ActionResult LogInCreated()
        {
            ViewBag.Message = "Thank you for registering with us, now you can log in";
            return View("LogIn");
        }





        public ActionResult LogOut()
        {
            return View();
        }




        public ActionResult UnApprovedBookings()
        {

            return View();
        }

    }
}