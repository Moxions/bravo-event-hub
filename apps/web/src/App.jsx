import './App.css'
import { useState, useMemo } from 'react'

const EventCard = ({ event, onDetails, getPillClass, getPillIcon }) => (
  <article className={`event-card ${event.type}`}>
    <div className="event-card-banner">
      <div className={`pill ${getPillClass(event.type)}`}>
        {getPillIcon(event.type)} {event.label}
      </div>
    </div>
    <div className="event-card-body">
      <h4>{event.title}</h4>
      <p>{event.subtitle}</p>
      <div className="meta">
        <span>📅 {event.date}</span>
        <span>📍 {event.venue}</span>
      </div>
      <button onClick={() => onDetails(event)}>View Details</button>
    </div>
  </article>
)

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const upcomingPasses = [
    { label: 'FESTIVAL', type: 'festival', title: 'Electric Horizon Festival', subtitle: 'The ultimate EDM experience', date: 'November 15, 2026', venue: 'Neon Fields Arena' },
    { label: 'CLUB NIGHT', type: 'club', title: 'Underground Techno Night', subtitle: 'Deep beats until sunrise', date: 'December 20, 2026', venue: 'Midnight Club' },
    { label: 'CLUB NIGHT', type: 'club', title: 'Rock N Roll', subtitle: 'Deep beats until sunrise', date: 'December 20, 2026', venue: 'Warehouse 42' },
    { label: 'INDIE', type: 'indie', title: 'RnB on the Lawn', subtitle: 'Raw talent in a serene setting', date: 'December 10, 2026', venue: 'South side Arena' },
  ]

  const popularEvents = [
    { label: 'INDIE', type: 'indie', title: 'Summer Classics', subtitle: 'Raw talent in a serene setting', date: 'December 10, 2026', venue: 'Central Park Conservatory' },
    { label: 'CONCERT', type: 'concert', title: 'Midnight Jazz Sessions', subtitle: 'Soulful rhythms under the stars', date: 'December 5, 2026', venue: 'The Blue Note Club' },
    { label: 'FESTIVAL', type: 'festival', title: 'Sunset Beats Festival', subtitle: 'Chill vibes and sunset views', date: 'October 22, 2026', venue: 'Beachfront Park' },
  ]

  const recentlyAdded = [
    { label: 'CLUB NIGHT', type: 'club', title: 'Neon Glow Party', subtitle: 'Glow in the dark dance night', date: 'January 10, 2027', venue: 'Glow Club' },
    { label: 'INDIE', type: 'indie', title: 'Acoustic Nights', subtitle: 'Intimate acoustic performances', date: 'November 28, 2026', venue: 'Cozy Cafe' },
    { label: 'CONCERT', type: 'concert', title: 'Pop Star Live', subtitle: 'Chart-topping hits live', date: 'February 14, 2027', venue: 'Stadium Arena' },
  ]

  const filteredPopular = useMemo(() => popularEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm])

  const filteredRecent = useMemo(() => recentlyAdded.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm])

  const getPillClass = (type) => `pill-${type || 'default'}`

  const getPillIcon = (type) => {
    const icons = { festival: '🎉', club: '🔴', indie: '🟢', concert: '🎵' }
    return icons[type] || '📌'
  }

  const handleViewDetails = (event) => {
    alert(`Viewing details for: ${event.title}`)
  }

  const handleScan = () => {
    alert('Scanning QR code...')
  }

  const handleAction = (action) => {
    alert(`Action: ${action}`)
  }

  const handleViewAll = (section) => {
    alert(`Viewing all ${section}`)
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="brand">Bravo</div>
        <nav className="nav">
          <button className="nav-link active">Discover</button>
          <button className="nav-link">My Tickets</button>
        </nav>
        <button className="avatar" aria-label="User Profile">KM</button>
      </header>

      <section className="hero">
        <div>
          <h1>Attendee. Dashboard.</h1>
          <p>Keep track of the shows you love and scan in to new experiences.</p>
          <input
            type="text"
            placeholder="Search events or venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="scan-cta" onClick={handleScan}>Scan to Register</button>
      </section>

      <section className="quick-actions">
        <article className="action-card" onClick={() => handleAction('Browse Events')}>
          <h3>Browse Events</h3>
          <p>Discover amazing shows near you</p>
        </article>
        <article className="action-card" onClick={() => handleAction('Scan QR Code')}>
          <h3>Scan QR Code</h3>
          <p>Quick registration with QR</p>
        </article>
        <article className="action-card" onClick={() => handleAction('My Events')}>
          <h3>My Events</h3>
          <p>View all your registrations</p>
        </article>
      </section>

      <section className="section-block">
        <div className="section-header"><h2>Your Upcoming Passes</h2></div>
        <div className="event-grid upcoming">
          {upcomingPasses.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onDetails={handleViewDetails}
              getPillClass={getPillClass}
              getPillIcon={getPillIcon}
            />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header with-link">
          <h2>Popular Events</h2>
          <button className="view-all" onClick={() => handleViewAll('Popular Events')}>View All →</button>
        </div>
        <div className="event-grid">
          {filteredPopular.length > 0 ? (
            filteredPopular.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onDetails={handleViewDetails}
                getPillClass={getPillClass}
                getPillIcon={getPillIcon}
              />
            ))
          ) : (
            <div className="no-results">No events found for "{searchTerm}"</div>
          )}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header with-link">
          <h2>Recently Added</h2>
          <button className="view-all" onClick={() => handleViewAll('Recently Added')}>View All →</button>
        </div>
        <div className="event-grid">
          {filteredRecent.length > 0 ? (
            filteredRecent.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onDetails={handleViewDetails}
                getPillClass={getPillClass}
                getPillIcon={getPillIcon}
              />
            ))
          ) : (
            <div className="no-results">No events found for "{searchTerm}"</div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
