import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockEvents = [
      { id: "1", name: "Summer Music Fest", date: "June 15, 2026", location: "Gaborone", category: "music", description: "Join us for an amazing summer music festival." },
      { id: "2", name: "Tech Conference 2026", date: "July 20, 2026", location: "Francistown", category: "tech", description: "The biggest tech conference in Botswana." },
      { id: "3", name: "Sports Tournament", date: "August 5, 2026", location: "Lobatse", category: "sports", description: "Annual sports tournament for all ages." }
    ];
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="container">
      <h1>Discover Events</h1>
      <p className="subtitle">Find your next experience</p>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-category">{event.category}</div>
            <h3>{event.name}</h3>
            <p className="event-date">📅 {event.date}</p>
            <p className="event-location">📍 {event.location}</p>
            <p className="event-description">{event.description}</p>
            <Link to={`/event/${event.id}`}>
              <button className="view-btn">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseEvents;