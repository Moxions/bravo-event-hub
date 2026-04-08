import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../auth';
import './Auth.css';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signUp(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Unable to create account');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <div className="brand-box">
            <div className="brand-logo">📅</div>
            <div className="brand-title">Bravo Event Hub</div>
            <div className="brand-tag">Join thousands of music enthusiasts and creators</div>
          </div>
        </div>

        <div className="auth-right">
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Join thousands of music enthusiasts and creators</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label>First name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Kabelo" />
              </div>

              <div className="input-group">
                <label>Last name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Masita" />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+267" />
              </div>

              <div className="input-group">
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
              </div>

              <div className="input-group">
                <label>Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
              </div>

              <div className="input-group full-width">
                <p className="muted-link">Already have an account? <a href="/signin">Log in</a></p>
              </div>
            </div>

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
