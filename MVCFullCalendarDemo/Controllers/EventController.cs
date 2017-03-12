using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MVCFullCalendarDemo.Models;

namespace MVCFullCalendarDemo.Controllers
{
public class EventController : ApiController
{
    private EventContext db = new EventContext();

    // GET api/Event
    public IQueryable<Event> GetEvents()
    {
        return db.Events;
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            db.Dispose();
        }
        base.Dispose(disposing);
    }
}
}