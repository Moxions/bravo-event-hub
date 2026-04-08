import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AttendeeDashboard from './pages/AttendeeDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<AttendeeDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App