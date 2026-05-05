import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BrowseEvents from "./pages/BrowseEvents";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import EventDetails from "./pages/EventDetails";
function App() {
return (
<Router>
 <div>
<nav>
<Link to="/">Home</Link>
  <Link to="/signin/attendee">Login</Link>
 <Link to="/signup/attendee">Sign Up</Link>
 </nav>
<Routes>
<Route path="/" element={<BrowseEvents />} />
<Route path="/signin/:role?" element={<Signin />} />
<Route path="/signup/:role?" element={<Signup />} />
<Route path="/event/:id" element={<EventDetails />} />
</Routes>
 </div>
</Router>
);
}
export default App;
