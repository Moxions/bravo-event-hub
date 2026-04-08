import './App.css'

function App() {
  const upcomingPasses = [
    {
      label: 'FESTIVAL',
      type: 'festival',
      title: 'Electric Horizon Festival',
      subtitle: 'The ultimate EDM experience',
      date: 'November 15, 2024',
      venue: 'Neon Fields Arena',
    },
    {
      label: 'CLUB NIGHT',
      type: 'club',
      title: 'Underground Techno Night',
      subtitle: 'Deep beats until sunrise',
      date: 'December 20, 2024',
      venue: 'Midnight Club',
    },
    {
      label: 'CLUB NIGHT',
      type: 'club',
      title: 'Rock N Roll',
      subtitle: 'Deep beats until sunrise',
      date: 'December 20, 2024',
      venue: 'Warehouse 42',
    },
    {
      label: 'INDIE',
      type: 'indie',
      title: 'RnB on the Lawn',
      subtitle: 'Raw talent in a serene setting',
      date: 'December 10, 2024',
      venue: 'South side Arena',
    },
  ]

  const popularEvents = [
    {
      label: 'INDIE',
      type: 'indie',
      title: 'Summer Classics',
      subtitle: 'Raw talent in a serene setting',
      date: 'December 10, 2024',
      venue: 'Central Park Conservatory',
    },
    {
      label: 'CONCERT',
      type: 'concert',
      title: 'Midnight Jazz Sessions',
      subtitle: 'Soulful rhythms under the stars',
      date: 'December 5, 2024',
      venue: 'The Blue Note Club',
    },
    {
      label: 'FESTIVAL',
      type: 'festival',
      title: 'Electric Horizon Festival',
      subtitle: 'The ultimate EDM experience',
      date: 'November 15, 2024',
      venue: 'Neon Fields Arena',
    },
  ]

  const recentlyAdded = [
    {
      label: 'CLUB NIGHT',
      type: 'club',
      title: 'Underground Techno Night',
      subtitle: 'Deep beats until sunrise',
      date: 'December 20, 2024',
      venue: 'Midnight Club',
    },
    {
      label: 'INDIE',
      type: 'indie',
      title: 'RnB on the Lawn',
      subtitle: 'Raw talent in a serene setting',
      date: 'December 10, 2024',
      venue: 'South side Arena',
    },
    {
      label: 'CONCERT',
      type: 'concert',
      title: 'Midnight Jazz Sessions',
      subtitle: 'Soulful rhythms under the stars',
      date: 'December 5, 2024',
      venue: 'The Blue Note Club',
    },
  ]

  // Helper function to get pill class based on event type
  const getPillClass = (type) => {
    switch(type) {
      case 'festival':
        return 'pill-festival'
      case 'club':
        return 'pill-club'
      case 'indie':
        return 'pill-indie'
      case 'concert':
        return 'pill-concert'
      default:
        return 'pill-default'
    }
  }

  // Helper function to get pill icon
  const getPillIcon = (type) => {
    switch(type) {
      case 'festival':
        return '🎉'
      case 'club':
        return '🔴'
      case 'indie':
        return '🟢'
      case 'concert':
        return '🎵'
      default:
        return '📌'
    }
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="brand">Bravo</div>
        <nav className="nav">
          <button className="nav-link active">Discover</button>
          <button className="nav-link">My Tickets</button>
        </nav>
        <button className="avatar">KM</button>
      </header>

      <section className="hero">
        <div>
          <h1>Attendee. Dashboard.</h1>
          <p>Keep track of the shows you love and scan in to new experiences.</p>
        </div>
        <button className="scan-cta">Scan to Register</button>
      </section>

      <section className="quick-actions">
        <article className="action-card">
          <h3>Browse Events</h3>
          <p>Discover amazing shows near you</p>
        </article>
        <article className="action-card">
          <h3>Scan QR Code</h3>
          <p>Quick registration with QR</p>
        </article>
        <article className="action-card">
          <h3>My Events</h3>
          <p>View all your registrations</p>
        </article>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Your Upcoming Passes</h2>
        </div>
        <div className="event-grid upcoming">
          {upcomingPasses.map((event, index) => (
            <article className={`event-card ${event.type}`} key={index}>
              <div className={`pill ${getPillClass(event.type)}`}>
                {getPillIcon(event.type)} {event.label}
              </div>
              <h4>{event.title}</h4>
              <p>{event.subtitle}</p>
              <div className="meta">
                <span>📅 {event.date}</span>
                <span>📍 {event.venue}</span>
              </div>
              <button>View Details</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header with-link">
          <h2>Popular Events</h2>
          <button className="view-all">View All →</button>
        </div>
        <div className="event-grid">
          {popularEvents.map((event, index) => (
            <article className={`event-card ${event.type}`} key={index}>
              <div className={`pill ${getPillClass(event.type)}`}>
                {getPillIcon(event.type)} {event.label}
              </div>
              <h4>{event.title}</h4>
              <p>{event.subtitle}</p>
              <div className="meta">
                <span>📅 {event.date}</span>
                <span>📍 {event.venue}</span>
              </div>
              <button>View Details</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header with-link">
          <h2>Recently Added</h2>
          <button className="view-all">View All →</button>
        </div>
        <div className="event-grid">
          {recentlyAdded.map((event, index) => (
            <article className={`event-card ${event.type}`} key={index}>
              <div className={`pill ${getPillClass(event.type)}`}>
                {getPillIcon(event.type)} {event.label}
              </div>
              <h4>{event.title}</h4>
              <p>{event.subtitle}</p>
              <div className="meta">
                <span>📅 {event.date}</span>
                <span>📍 {event.venue}</span>
              </div>
              <button>View Details</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App