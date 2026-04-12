import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import OrganizerDashboard from "./pages/organiser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/signin"
        element={<Navigate to="/signin/attendee" replace />}
      />
      <Route path="/signin/:role" element={<Signin />} />
      <Route
        path="/signup"
        element={<Navigate to="/signup/attendee" replace />}
      />
      <Route path="/signup/:role" element={<Signup />} />
      <Route
        path="/dashboard"
        element={<Navigate to="/dashboard/attendee" replace />}
      />
      <Route path="/dashboard/attendee" element={<AttendeeDashboard />} />
      <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
