import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import "./OrganiserCreateEvent.css";

export default function OrganiserEditEvents() {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Updating event", form);
    alert("Event updated successfully!");
    navigate("/dashboard/organiser");
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this event? This action cannot be undone.",
      )
    ) {
      try {
        const docRef = doc(db, "events", id);
        await deleteDoc(docRef);
        alert("Event deleted successfully!");
        navigate("/dashboard/organiser");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
                  By updating, you agree to EventHive’s terms for music
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
