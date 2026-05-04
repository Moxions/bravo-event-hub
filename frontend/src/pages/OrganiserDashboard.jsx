import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SharedDashboard.css";
import "./OrganiserDashboard.css";
import {
  deleteEvent,
  getEventsByOrganizer,
} from "../events";
import { getCurrentUser, signOut } from "../auth";

const getEventDate = (value) => {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const normalizeEvent = (event) => {
  const eventDate = getEventDate(event.date);
  const type = String(event.eventType || event.primaryGenre || "event")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") || "event";
  const themeMap = {
    festival: "purple",
    concert: "orange",
    indie: "green",
    "club-night": "purple",
    club: "purple",
  };

  return {
    ...event,
    tag: String(event.primaryGenre || event.eventType || "EVENT").toUpperCase(),
    subtitle: event.tagline || event.description || "No description yet.",
    registered: `${Number(event.attendeeCount || 0)} registered`,
    attendeeCount: Number(event.attendeeCount || 0),
    theme: themeMap[type] || "green",
    dateLabel: eventDate
      ? eventDate.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Date not set",
    eventDate,
  };
};

function OrganizerEventCard({ event, onDelete }) {
  return (
    <article className="org-event-card ui-card">
      <div className={`org-event-top ui-card-top ${event.theme}`}>
        <span className="ui-chip">{event.tag}</span>
        <span className="org-event-icon">{event.icon}</span>
      </div>
      <div className="org-event-body">
        <h3>{event.title}</h3>
        <p>{event.subtitle}</p>
        <div className="org-event-footer">
          <span>
            {event.registered} • {event.dateLabel}
          </span>
          <div className="org-event-actions">
            <button className="ui-secondary-btn" type="button">
              View Details
            </button>
            <Link
              to={`/dashboard/organiser/edit-event/${event.id}`}
              className="ui-primary-btn"
            >
              Edit
            </Link>
            <button
              className="ui-secondary-btn danger-btn"
              type="button"
              onClick={() => onDelete(event.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OrganiserDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const user = getCurrentUser();

  const loadEvents = async () => {
    if (!user?.uid) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const organizerEvents = await getEventsByOrganizer(user.uid);
      const sorted = organizerEvents
        .map(normalizeEvent)
        .sort((left, right) => (right.eventDate || 0) - (left.eventDate || 0));
      setEvents(sorted);
    } catch (loadError) {
      setError(loadError?.message || "Failed to load your events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const metrics = useMemo(() => {
    const now = new Date();
    const thisMonth = events.filter(
      (event) =>
        event.eventDate &&
        event.eventDate.getMonth() === now.getMonth() &&
        event.eventDate.getFullYear() === now.getFullYear(),
    ).length;
    const totalAttendees = events.reduce(
      (count, event) => count + event.attendeeCount,
      0,
    );
    const averageEngagement =
      events.length > 0 ? Math.round(totalAttendees / events.length) : 0;

    return [
      {
        label: "Your Events",
        value: String(events.length),
        note: `${thisMonth} active this month`,
        icon: "📅",
        theme: "org-theme-purple",
      },
      {
        label: "Total Attendees",
        value: String(totalAttendees),
        note: "Across your events",
        icon: "👥",
        theme: "org-theme-blue",
      },
      {
        label: "Avg Engagement",
        value: String(averageEngagement),
        note: "Average attendees per event",
        icon: "📈",
        theme: "org-theme-green",
      },
    ];
  }, [events]);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Delete this event permanently?")) {
      return;
    }

    try {
      await deleteEvent(eventId);
      setStatus("Event deleted successfully.");
      await loadEvents();
    } catch (deleteError) {
      setError(deleteError?.message || "Failed to delete event.");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/portal");
  };

  return (
    <div className="org-page ui-page">
      <header className="org-navbar">
        <div className="org-brand-wrap">
          <div className="org-logo">▢</div>
          <div className="org-brand">Bravo</div>
        </div>

        <nav className="org-nav-links">
          <a href="#analytics">ANALYTICS</a>
          <a href="#events">MY EVENTS</a>
        </nav>

        <div className="org-nav-actions">
          <button className="org-logout-btn" type="button" onClick={handleLogout}>
            Log out
          </button>
          <Link to="/dashboard/organiser/create-event" className="org-create-btn">
            + Create New Event
          </Link>
        </div>
      </header>

      <main className="org-shell ui-shell">
        <section className="org-hero">
          <h1>
            Organiser. <span>Dashboard.</span>
          </h1>
          <p>
            Manage your events and monitor audience performance in one place.
          </p>
        </section>

        <section className="ui-section" id="analytics">
          <div className="ui-section-head">
            <h2 className="ui-section-title">Overview Metrics</h2>
          </div>
          <div className="org-metric-grid ui-grid-three">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className={`org-metric-card ui-card ${metric.theme}`}
              >
                <div className="org-metric-icon">{metric.icon}</div>
                <div>
                  <p className="org-metric-label">{metric.label}</p>
                  <h3 className="org-metric-value">{metric.value}</h3>
                  <p className="org-metric-note">{metric.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ui-section" id="events">
          <div className="ui-section-head">
            <h2 className="ui-section-title">Active Events</h2>
            <button className="ui-link-btn" type="button" onClick={loadEvents}>
              Refresh
            </button>
          </div>
          {status ? <p className="org-feedback success">{status}</p> : null}
          {error ? <p className="org-feedback error">{error}</p> : null}
          <div className="ui-grid-three">
            {loading ? <p className="org-empty">Loading events...</p> : null}
            {!loading && events.length === 0 ? (
              <p className="org-empty">No events yet. Create your first event to get started.</p>
            ) : null}
            {!loading
              ? events.map((event) => (
                  <OrganizerEventCard
                    key={event.id}
                    event={event}
                    onDelete={handleDelete}
                  />
                ))
              : null}
          </div>
        </section>
      </main>
    </div>
  );
}
