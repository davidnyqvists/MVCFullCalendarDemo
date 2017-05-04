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
            if (Session["acessToken"] == null)
            {
                return RedirectToAction("LogIn");

            }
            return View();
        }
        public ActionResult Register()
        {


            if (Session["acessToken"] == null)
            {
                return RedirectToAction("LogIn");

            }


            return View();
        }
        public ActionResult CategoryAdd()
        {
            if (Session["acessToken"] == null)
            {
                return RedirectToAction("LogIn");

            }

            return View();
        }

        public ActionResult Settings()
        {
            //if (Session["acessToken"] == null)
            //{
            //    return RedirectToAction("LogIn");

            //}

            return View();
        }

        public ActionResult Start()
        {
            return View();
        }
        public ActionResult StartLoggedIn()
        {
            if (Session["acessToken"] == null)
            {
                return RedirectToAction("LogIn");

            }
            return View();
        }
        public ActionResult LogIn()
        {
            return View();
        }

        public ActionResult LogOut()
        {
            return View();
        }




        public ActionResult UnApprovedBookings()
        {
            //if (Session["acessToken"] == null)
            //{
            //    return RedirectToAction("LogIn");

            //}
            return View();
        }

    }
}