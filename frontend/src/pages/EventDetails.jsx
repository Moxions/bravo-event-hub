import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../events";
import { addToCart, isInCart } from "../cart";
import { normalizeEvent } from "../eventUtils";
import "./BrowseEvents.css";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      const eventData = await getEventById(id);
      setEvent(eventData ? normalizeEvent(eventData) : null);
      setLoading(false);
    };

    loadEvent();
  }, [id]);

  const handleAddToCart = () => {
    if (!event) return;
    const result = addToCart(event);
    setMessage(result.alreadyInCart ? "This event is already in your cart." : "Added to cart.");
  };

  return (
    <div className="browse-page">
      <header className="browse-header">
        <div>
          <p className="browse-eyebrow">Event Details</p>
          <h1>Selected event</h1>
        </div>
        <div className="browse-header-actions">
          <Link className="browse-header-link" to="/browse-events">
            Back to Browse
          </Link>
          <Link className="browse-header-link" to="/cart">
            Cart
          </Link>
        </div>
      </header>

      <main className="browse-shell">
        {loading ? <p className="browse-empty">Loading event details...</p> : null}
        {!loading && !event ? <p className="browse-empty">Event not found.</p> : null}

        {event ? (
          <article className="details-card">
            <div className={`browse-event-top ${event.theme}`}>
              <div>
                <p className="browse-event-tag">{event.tag}</p>
                <h3>{event.title}</h3>
              </div>
              <span className="browse-event-icon">◉</span>
            </div>
            <div className="browse-event-body">
              <p className="browse-event-subtitle">{event.description || event.subtitle}</p>
              <div className="browse-event-meta">
                <span>📅 {event.dateLabel}</span>
                <span>📍 {event.venue}</span>
                <span>👥 {event.attendeeCount} registered</span>
              </div>
              <div className="browse-event-actions">
                <button
                  className="browse-cart-btn"
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isInCart(event.id)}
                >
                  {isInCart(event.id) ? "In Cart" : "Add to Cart"}
                </button>
                <Link className="browse-event-link" to="/cart">
                  View Cart
                </Link>
              </div>
              {message ? <p className="browse-message">{message}</p> : null}
            </div>
          </article>
        ) : null}
      </main>
    </div>
  );
}
