using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MVCFullCalendarDemo.Models
{
    public class Event
    {
        public int id { get; set; }
        public string title { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
    }

    public class EventContext : DbContext
    {
        public DbSet<Event> Events { get; set; }
    }
}