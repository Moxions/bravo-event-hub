import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart, removeFromCart } from "../cart";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState(getCart());

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (eventId) => {
    setCartItems(removeFromCart(eventId));
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div>
          <p className="cart-eyebrow">Cart</p>
          <h1>Your selected events</h1>
        </div>
        <div className="cart-header-actions">
          <Link className="cart-header-link" to="/dashboard/attendee">
            Dashboard
          </Link>
          <Link className="cart-header-link" to="/browse-events">
            Continue Browsing
          </Link>
        </div>
      </header>

      <main className="cart-shell">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h2>No events in your cart.</h2>
            <p>Go back to browse events and add something you like.</p>
            <Link className="cart-cta" to="/browse-events">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="cart-list">
            {cartItems.map((event) => (
              <article className="cart-card" key={event.id}>
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
                  </div>
                  <button
                    className="browse-remove-btn"
                    type="button"
                    onClick={() => handleRemove(event.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
