import './App.css'
import { useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@bravo-event/firebase'
import { getEvents, getEventsByUser, registerForEvent } from './firebase/events'

const toDate = (value) => {
  if (!value) return null
  if (typeof value?.toDate === 'function') return value.toDate()

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const normalizeType = (value) => {
  const text = String(value || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return text || 'event'
}

const normalizeEvent = (event) => {
  const eventDate = toDate(event.date || event.startsAt || event.eventDate)
  const createdDate = toDate(event.createdAt) || eventDate

  return {
    ...event,
    label: String(event.primaryGenre || event.eventType || event.category || 'Event').toUpperCase(),
    type: normalizeType(event.eventType || event.primaryGenre || event.category),
    subtitle: event.tagline || event.description || 'Live event',
    venue: event.venue || 'Venue to be announced',
    dateLabel: eventDate ? eventDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Date to be announced',
    eventDate,
    createdDate,
    attendeeCount: Number(event.attendeeCount || 0),
  }
}

const getInitials = (value) => {
  if (!value) return 'GU'
  return value
    .split(/[@._\-\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'GU'
}

const EventCard = ({ event, onDetails, onRegister, isRegistering, canRegister }) => (
  <article className="event-card">
    <div className="event-card-top">
      <span className={`pill pill-${event.type}`}>{event.label}</span>
      <span className="event-count">{event.attendeeCount} registered</span>
    </div>
    <div className="event-card-body">
      <h3>{event.title || 'Untitled event'}</h3>
      <p>{event.subtitle}</p>
      <div className="meta">
        <span>📅 {event.dateLabel}</span>
        <span>📍 {event.venue}</span>
      </div>
      <div className="card-actions">
        <button className="secondary-btn" type="button" onClick={() => onDetails(event)}>
          Details
        </button>
        <button
          className="primary-btn"
          type="button"
          onClick={() => onRegister(event)}
          disabled={!canRegister || isRegistering}
        >
          {isRegistering ? 'Registering...' : canRegister ? 'Register' : 'Sign in required'}
        </button>
      </div>
    </div>
  </article>
)

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [events, setEvents] = useState([])
  const [myEvents, setMyEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [currentUser, setCurrentUser] = useState(auth.currentUser)
  const [registeringId, setRegisteringId] = useState(null)

  useEffect(() => onAuthStateChanged(auth, (nextUser) => setCurrentUser(nextUser)), [])

  const loadDashboard = async (user = currentUser) => {
    setLoading(true)
    setError('')

    try {
      const [eventDocs, registrationDocs] = await Promise.all([
        getEvents(),
        user?.uid ? getEventsByUser(user.uid) : Promise.resolve([]),
      ])

      const normalizedEvents = eventDocs.map(normalizeEvent)
      const normalizedRegistrations = registrationDocs.map((entry) => ({
        ...entry,
        event: normalizeEvent(entry.event),
      }))

      setEvents(normalizedEvents)
      setMyEvents(normalizedRegistrations)

      setSelectedEvent((previous) => {
        if (!previous) return normalizedEvents[0] || null
        return normalizedEvents.find((event) => event.id === previous.id) || normalizedEvents[0] || null
      })
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load events from the database.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard(currentUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid])

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return events.filter((event) => {
      if (!term) return true

      return [event.title, event.subtitle, event.venue, event.label]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    })
  }, [events, searchTerm])

  const upcomingPasses = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return [...filteredEvents]
      .filter((event) => event.eventDate && event.eventDate >= today)
      .sort((left, right) => left.eventDate - right.eventDate)
      .slice(0, 4)
  }, [filteredEvents])

  const popularEvents = useMemo(() => {
    return [...filteredEvents]
      .sort((left, right) => right.attendeeCount - left.attendeeCount || (right.createdDate || 0) - (left.createdDate || 0))
      .slice(0, 6)
  }, [filteredEvents])

  const recentlyAdded = useMemo(() => {
    return [...filteredEvents]
      .sort((left, right) => (right.createdDate || 0) - (left.createdDate || 0))
      .slice(0, 6)
  }, [filteredEvents])

  const analytics = useMemo(() => {
    const totalAttendees = events.reduce((total, event) => total + event.attendeeCount, 0)
    const upcomingCount = events.filter((event) => event.eventDate && event.eventDate >= new Date()).length
    const organizerCount = new Set(events.map((event) => event.organizerId).filter(Boolean)).size
    const genreCount = new Set(events.map((event) => event.label).filter(Boolean)).size

    return [
      { label: 'Total Events', value: events.length, note: 'Saved in Firestore' },
      { label: 'Total Registrations', value: totalAttendees, note: 'Across all events' },
      { label: 'Upcoming Events', value: upcomingCount, note: 'Dated in the future' },
      { label: 'Active Organizers', value: organizerCount, note: `${genreCount} event categories` },
    ]
  }, [events])

  const handleDetails = (event) => {
    setSelectedEvent(event)
    setStatusMessage('')
  }

  const handleRegister = async (event) => {
    if (!currentUser?.uid) {
      setStatusMessage('Sign in first to register for an event.')
      return
    }

    try {
      setRegisteringId(event.id)
      setStatusMessage('')
      await registerForEvent(currentUser.uid, event.id)
      setStatusMessage(`Registered for ${event.title}.`)
      await loadDashboard(currentUser)
    } catch (registerError) {
      setStatusMessage(registerError?.message || 'Registration failed.')
    } finally {
      setRegisteringId(null)
    }
  }

  const userLabel = currentUser?.email || 'Guest viewer'
  const userInitials = getInitials(currentUser?.email)
  const selectedDetails = selectedEvent || events[0] || null

  return (
    <main className="dashboard">
      <header className="topbar">
        <div>
          <div className="brand">Bravo Event Hub</div>
          <p className="brand-subtitle">All event data is coming from Firestore.</p>
        </div>
        <nav className="nav">
          <a className="nav-link" href="#analytics">Analytics</a>
          <a className="nav-link" href="#upcoming">Upcoming</a>
          <a className="nav-link" href="#recent">Recent</a>
          <a className="nav-link" href="#my-events">My Events</a>
        </nav>
        <button className="avatar" type="button" aria-label="Signed in user">
          {userInitials}
        </button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Live Database Dashboard</p>
          <h1>Browse, register, and manage events directly from Firestore.</h1>
          <p className="hero-copy">
            The page no longer uses placeholder cards. Every section now reads from the database and updates after registration.
          </p>
          <label className="search-label" htmlFor="event-search">
            Search the live event feed
          </label>
          <input
            id="event-search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="search-input"
            aria-label="Search events"
          />
          <p className="user-status">Viewing as {userLabel}</p>
        </div>
        <div className="hero-panel">
          <h2>Current feed</h2>
          <p>{events.length} events loaded from the database.</p>
          <button className="primary-btn hero-button" type="button" onClick={() => loadDashboard(currentUser)}>
            Refresh data
          </button>
        </div>
      </section>

      {statusMessage ? <div className="status-banner">{statusMessage}</div> : null}
      {error ? <div className="status-banner error">{error}</div> : null}

      <section className="section-block" id="analytics">
        <div className="section-header">
          <h2>Analytics</h2>
        </div>
        <div className="analytics-grid">
          {analytics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <p>{metric.label}</p>
              <h3>{metric.value}</h3>
              <span>{metric.note}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" id="upcoming">
        <div className="section-header">
          <h2>Upcoming Passes</h2>
          <span>{upcomingPasses.length} upcoming events</span>
        </div>
        <div className="event-grid upcoming">
          {loading ? (
            <div className="empty-state">Loading events from Firestore...</div>
          ) : upcomingPasses.length > 0 ? (
            upcomingPasses.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDetails={handleDetails}
                onRegister={handleRegister}
                isRegistering={registeringId === event.id}
                canRegister={Boolean(currentUser?.uid)}
              />
            ))
          ) : (
            <div className="empty-state">No upcoming events found in the database.</div>
          )}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Popular Events</h2>
          <span>Sorted by registrations</span>
        </div>
        <div className="event-grid">
          {popularEvents.length > 0 ? (
            popularEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDetails={handleDetails}
                onRegister={handleRegister}
                isRegistering={registeringId === event.id}
                canRegister={Boolean(currentUser?.uid)}
              />
            ))
          ) : (
            <div className="empty-state">No events match your search yet.</div>
          )}
        </div>
      </section>

      <section className="section-block" id="recent">
        <div className="section-header">
          <h2>Recently Added</h2>
          <span>Sorted by creation time</span>
        </div>
        <div className="event-grid">
          {recentlyAdded.length > 0 ? (
            recentlyAdded.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDetails={handleDetails}
                onRegister={handleRegister}
                isRegistering={registeringId === event.id}
                canRegister={Boolean(currentUser?.uid)}
              />
            ))
          ) : (
            <div className="empty-state">No recent events available.</div>
          )}
        </div>
      </section>

      <section className="section-block" id="my-events">
        <div className="section-header">
          <h2>My Events</h2>
          <span>{myEvents.length} registered events</span>
        </div>
        <div className="event-grid">
          {currentUser?.uid ? (
            myEvents.length > 0 ? (
              myEvents.map((entry) => (
                <article className="event-card registered-card" key={entry.registrationId}>
                  <div className="event-card-top">
                    <span className={`pill pill-${entry.event.type}`}>{entry.event.label}</span>
                    <span className="event-count">{entry.status || 'registered'}</span>
                  </div>
                  <div className="event-card-body">
                    <h3>{entry.event.title}</h3>
                    <p>{entry.event.subtitle}</p>
                    <div className="meta">
                      <span>📅 {entry.event.dateLabel}</span>
                      <span>📍 {entry.event.venue}</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">You have not registered for any events yet.</div>
            )
          ) : (
            <div className="empty-state">Sign in to see your registrations.</div>
          )}
        </div>
      </section>

      <section className="section-block details-section">
        <div className="section-header">
          <h2>Selected Event</h2>
        </div>
        {selectedDetails ? (
          <article className="details-card">
            <div>
              <span className={`pill pill-${selectedDetails.type}`}>{selectedDetails.label}</span>
              <h3>{selectedDetails.title}</h3>
              <p>{selectedDetails.subtitle}</p>
            </div>
            <div className="details-meta">
              <span>📅 {selectedDetails.dateLabel}</span>
              <span>📍 {selectedDetails.venue}</span>
              <span>👥 {selectedDetails.attendeeCount} registered</span>
            </div>
          </article>
        ) : (
          <div className="empty-state">Choose an event to see details.</div>
        )}
      </section>
    </main>
  )
}

export default App
