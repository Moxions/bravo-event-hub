import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEvent, getEventById, updateEvent } from "../events";
import { getCurrentUser } from "../auth";
import "./OrganiserCreateEvent.css";

export default function OrganiserEditEvents() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    category: "",
    eventType: "",
    primaryGenre: "",
    date: "",
    doors: "",
    venue: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const user = getCurrentUser();

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        const eventData = await getEventById(id);
        if (eventData) {
          if (
            user?.uid &&
            eventData.organizerId &&
            eventData.organizerId !== user.uid
          ) {
            setError("You can only edit your own events.");
          } else {
            setForm({
              title: eventData.title || "",
              tagline: eventData.tagline || "",
              description: eventData.description || "",
              eventType: eventData.eventType || "",
              primaryGenre: eventData.primaryGenre || "",
              date: eventData.date || "",
              doors: eventData.doors || "",
              venue: eventData.venue || "",
            });
          }
        } else {
          setError("Event not found.");
        }
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id, user?.uid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.uid) {
      setError("Please sign in again to update this event.");
      return;
    }

    try {
      await updateEvent(id, form);
      setStatus("Event updated successfully.");
      navigate("/dashboard/organiser");
    } catch (updateError) {
      setError(updateError?.message || "Failed to update event.");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this event? This action cannot be undone.",
      )
    ) {
      try {
        await deleteEvent(id);
        navigate("/dashboard/organiser");
      } catch (error) {
        console.error("Error deleting event:", error);
        setError("Failed to delete event. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && error.includes("only edit your own")) {
    return (
      <div className="create-event-page ui-page">
        <main className="create-event-shell ui-shell">
          <p className="error-message">{error}</p>
          <button
            className="create-event-back"
            type="button"
            onClick={() => navigate("/dashboard/organiser")}
          >
            Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="create-event-page ui-page">
      <header className="create-event-navbar">
        <div className="create-event-brand-wrap">
          <div className="create-event-logo">▢</div>
          <div className="create-event-brand">Bravo</div>
        </div>
        <div className="create-event-actions">
          <button
            className="create-event-back"
            type="button"
            onClick={() => navigate("/dashboard/organiser")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <main className="create-event-shell ui-shell">
        <section className="create-event-header">
          <div>
            <p className="create-event-eyebrow">Edit Event</p>
            <h1>Update your event details.</h1>
          </div>
        </section>

        <form className="create-event-form" onSubmit={handleSubmit}>
          {status ? <p className="success-message">{status}</p> : null}
          {error ? <p className="error-message">{error}</p> : null}
          <div className="create-event-grid">
            <div className="create-event-card ui-card show-details-card">
              <div className="create-event-card-head">
                <h2>Event Details</h2>
                <p>Define the experience and energy for your event.</p>
              </div>

              <label className="form-field">
                <span>Event Title</span>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Midnight Symphony 2024"
                />
              </label>

              <label className="form-field">
                <span>Catchy Tagline</span>
                <input
                  name="tagline"
                  value={form.tagline}
                  onChange={handleChange}
                  placeholder="e.g. An evening of soulful melodies"
                />
              </label>

              <label className="form-field">
                <span>Full Bio / Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell attendees about the event, what they can expect, and why they should join."
                />
              </label>
            </div>

            <div className="create-event-side-column">
              <div className="create-event-card ui-card music-settings-card">
                <div className="create-event-card-head">
                  <h2>Event Settings</h2>
                </div>
                <label className="form-field">
                  <span>Category</span>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Music">Music</option>
                    <option value="Games">Games</option>
                    <option value="Business">Business</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Social">Social</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className="form-field">
                  <span>Event Type / Format</span>
                  <input
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    placeholder="e.g. Tournament, Workshop, Live Concert"
                  />
                </label>
                <label className="form-field">
                  <span>Theme / Genre</span>
                  <input
                    name="primaryGenre"
                    value={form.primaryGenre}
                    onChange={handleChange}
                    placeholder="e.g. Strategy Gaming, Business Networking, Indie Pop"
                  />
                </label>
                <button className="publish-show-btn" type="submit">
                  Update Event
                </button>{" "}
                <button
                  className="delete-event-btn"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete Event
                </button>{" "}
                <p className="publish-note">
                  By updating, you agree to EventHive’s terms for event hosts.
                </p>
              </div>

              <div className="create-event-card ui-card gig-logistics-card">
                <div className="create-event-card-head">
                  <h2>Event Logistics</h2>
                </div>

                <label className="form-field">
                  <span>Date</span>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </label>

                <label className="form-field">
                  <span>Doors Open</span>
                  <input
                    type="time"
                    name="doors"
                    value={form.doors}
                    onChange={handleChange}
                  />
                </label>

                <label className="form-field">
                  <span>Venue / Location</span>
                  <input
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    placeholder="Street address or 'Live on Twitch'"
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
