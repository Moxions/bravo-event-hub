import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BrowseEvents from "./pages/BrowseEvents";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import EventDetails from "./pages/EventDetails";
import { auth } from "./auth";

function Navigation() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/signin/attendee");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🎫 Bravo Event Hub</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Discover</Link>
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="btn-danger">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin/attendee" className="btn-outline">Login</Link>
            <Link to="/signup/attendee" className="btn-primary" style={{ width: "auto" }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<BrowseEvents />} />
        <Route path="/signin/:role?" element={<Signin />} />
        <Route path="/signup/:role?" element={<Signup />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;