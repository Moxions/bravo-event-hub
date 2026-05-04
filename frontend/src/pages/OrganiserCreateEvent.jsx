import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrganiserCreateEvent.css";
import { createEvent } from "../events";
import { getCurrentUser } from "../auth";

export default function OrganiserCreateEvent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    eventType: "",
    primaryGenre: "",
    date: "",
    doors: "",
    venue: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser?.uid) {
      setError("You need to be signed in before creating an event.");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);

      await createEvent(
        {
          title: form.title,
          tagline: form.tagline,
          description: form.description,
          eventType: form.eventType,
          primaryGenre: form.primaryGenre,
          date: form.date,
          doors: form.doors,
          venue: form.venue,
        },
        currentUser.uid,
      );

      navigate("/dashboard/organiser");
    } catch (submitError) {
      setError(submitError?.message || "Failed to create event.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <p className="create-event-eyebrow">List a New Performance</p>
            <h1>
              Get your next gig or festival in front of thousands of music fans.
            </h1>
          </div>
        </section>

        <form className="create-event-form" onSubmit={handleSubmit}>
          {error ? <p className="error-message">{error}</p> : null}
          <div className="create-event-grid">
            <div className="create-event-card ui-card show-details-card">
              <div className="create-event-card-head">
                <h2>Show Details</h2>
                <p>Define the vibe of your music event.</p>
              </div>

              <label className="form-field">
                <span>Event / Tour Title</span>
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
                  placeholder="Tell fans about the performers, the setlist, and the venue atmosphere..."
                />
              </label>
            </div>

            <div className="create-event-side-column">
              <div className="create-event-card ui-card music-settings-card">
                <div className="create-event-card-head">
                  <h2>Music Settings</h2>
                </div>

                <label className="form-field">
                  <span>Event Type</span>
                  <input
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    placeholder="e.g. Solo Acoustic"
                  />
                </label>

                <label className="form-field">
                  <span>Primary Genre</span>
                  <input
                    name="primaryGenre"
                    value={form.primaryGenre}
                    onChange={handleChange}
                    placeholder="e.g. Alternative Rock"
                  />
                </label>

                <button className="publish-show-btn" type="submit">
                  {isSubmitting ? "Publishing..." : "Publish Show"}
                </button>
                <p className="publish-note">
                  By publishing, you agree to EventHive’s terms for music
                  promoters.
                </p>
              </div>

              <div className="create-event-card ui-card gig-logistics-card">
                <div className="create-event-card-head">
                  <h2>Gig Logistics</h2>
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
