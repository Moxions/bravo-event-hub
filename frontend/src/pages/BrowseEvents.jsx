import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../events";
import { addToCart, getCart, isInCart } from "../cart";
import { eventMatchesSearch, normalizeEvent } from "../eventUtils";
import EventCard from "./EventCard";
import "./BrowseEvents.css";

export default function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [cartCount, setCartCount] = useState(getCart().length);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventDocs = await getEvents();
      setEvents(eventDocs.map(normalizeEvent));
      setCartCount(getCart().length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(
    () => events.filter((event) => eventMatchesSearch(event, searchTerm)),
    [events, searchTerm],
  );

  const handleAddToCart = (event) => {
    const result = addToCart(event);
    setCartCount(result.cart.length);
    setMessage(
      result.alreadyInCart
        ? `${event.title} is already in your cart.`
        : `${event.title} added to cart.`,
    );
  };

  return (
    <div className="browse-page">
      <header className="browse-header">
        <div>
          <p className="browse-eyebrow">Browse Events</p>
          <h1>Pick events and add them to your cart.</h1>
        </div>
        <div className="browse-header-actions">
          <Link className="browse-header-link" to="/cart">
            Cart ({cartCount})
          </Link>
        </div>
      </header>

      <main className="browse-shell">
        <section className="browse-toolbar">
          <input
            className="browse-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search title, venue, genre, or description"
          />
          <button className="browse-refresh" type="button" onClick={loadEvents}>
            Refresh
          </button>
        </section>

        {message ? <p className="browse-message">{message}</p> : null}

        <section className="browse-grid">
          {loading ? <p className="browse-empty">Loading events...</p> : null}
          {!loading && filteredEvents.length === 0 ? (
            <p className="browse-empty">No events found.</p>
          ) : null}
          {!loading
            ? filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onAddToCart={handleAddToCart}
                  isInCart={isInCart(event.id)}
                />
              ))
            : null}
        </section>
      </main>
    </div>
  );
}
