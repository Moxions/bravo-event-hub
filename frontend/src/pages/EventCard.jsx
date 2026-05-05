import { Link } from "react-router-dom";

export default function EventCard({ event, onAddToCart, isInCart = false }) {
  return (
    <article className="browse-event-card">
      <div className={`browse-event-top ${event.theme}`}>
        <div>
          <p className="browse-event-tag">{event.tag}</p>
          <h3>{event.title}</h3>
        </div>
        <span className="browse-event-icon">◉</span>
      </div>
      <div className="browse-event-body">
        <p className="browse-event-subtitle">{event.subtitle}</p>
        <div className="browse-event-meta">
          <span>📅 {event.dateLabel}</span>
          <span>📍 {event.venue}</span>
          <span>👥 {event.attendeeCount} registered</span>
        </div>
        <div className="browse-event-actions">
          <Link className="browse-event-link" to={`/events/${event.id}`}>
            View Details
          </Link>
          <button
            className="browse-cart-btn"
            type="button"
            onClick={() => onAddToCart(event)}
            disabled={isInCart}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
