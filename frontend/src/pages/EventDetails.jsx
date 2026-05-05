import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockEvents = {
      "1": { id: "1", name: "Summer Music Fest", date: "June 15, 2026", location: "Gaborone", category: "music", description: "Join us for an amazing summer music festival with top artists." },
      "2": { id: "2", name: "Tech Conference 2026", date: "July 20, 2026", location: "Francistown", category: "tech", description: "The biggest tech conference in Botswana." },
      "3": { id: "3", name: "Sports Tournament", date: "August 5, 2026", location: "Lobatse", category: "sports", description: "Annual sports tournament for all ages." }
    };
    setEvent(mockEvents[id]);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="loading">Loading event...</div>;
  if (!event) return <div className="loading">Event not found</div>;

  return (
    <div className="auth-container">
      <div className="event-details-container">
        <div className="event-details-category">{event.category}</div>
        <h1 className="event-details-title">{event.name}</h1>
        <p className="event-details-info">📅 {event.date}</p>
        <p className="event-details-info">📍 {event.location}</p>
        <p className="event-details-description">{event.description}</p>
      </div>
    </div>
  );
}

export default EventDetails;