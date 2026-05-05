import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import PortalSelect from "./pages/PortalSelect";
import AttendeeSignin from "./pages/AttendeeSignin";
import OrganiserSignin from "./pages/OrganiserSignin";
import AttendeeSignup from "./pages/AttendeeSignup";
import OrganiserSignup from "./pages/OrganiserSignup";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import OrganiserDashboard from "./pages/OrganiserDashboard";
import OrganiserCreateEvent from "./pages/OrganiserCreateEvent";
import OrganiserEditEvents from "./pages/OrganiserEditEvents";
import BrowseEvents from "./pages/BrowseEvents";
import Cart from "./pages/Cart";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/portal" element={<PortalSelect />} />
      <Route path="/signin" element={<Navigate to="/portal" replace />} />
      <Route path="/signin/attendee" element={<AttendeeSignin />} />
      <Route path="/signin/organizer" element={<OrganiserSignin />} />
      <Route path="/signin/organiser" element={<OrganiserSignin />} />
      <Route path="/signup" element={<Navigate to="/portal" replace />} />
      <Route path="/signup/attendee" element={<AttendeeSignup />} />
      <Route path="/signup/organizer" element={<OrganiserSignup />} />
      <Route path="/signup/organiser" element={<OrganiserSignup />} />
      <Route
        path="/dashboard"
        element={<Navigate to="/dashboard/attendee" replace />}
      />
      <Route path="/dashboard/attendee" element={<AttendeeDashboard />} />
      <Route path="/dashboard/organizer" element={<OrganiserDashboard />} />
      <Route path="/dashboard/organiser" element={<OrganiserDashboard />} />
      <Route path="/browse-events" element={<BrowseEvents />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route
        path="/dashboard/organiser/create-event"
        element={<OrganiserCreateEvent />}
      />
      <Route
        path="/dashboard/organiser/edit-event/:id"
        element={<OrganiserEditEvents />}
      />
      <Route
        path="/dashboard/organizer/edit-event/:id"
        element={<OrganiserEditEvents />}
      />
      <Route
        path="/dashboard/organizer/create-event"
        element={<OrganiserCreateEvent />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
