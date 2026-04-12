import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { signIn } from "../auth";
import "./Auth.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const roleParam =
    params.role ||
    new URLSearchParams(location.search).get("role") ||
    "attendee";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn(email, password);
    if (result.success) {
      const nextRole = roleParam || result.role || "attendee";
      navigate(`/dashboard/${nextRole}`);
    } else {
      setError(result.error || "Invalid email or password");
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
            <div className="brand-tag">Your Stage. Your Sound.</div>
          </div>
        </div>

        <div className="auth-right">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            Enter your credentials to access your dashboard
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group full-width">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              className="ghost-btn"
              onClick={() => navigate(`/dashboard/${roleParam}`)}
              style={{ marginTop: 12 }}
            >
              Continue without logging in
            </button>
          </form>

          <p className="muted-link">
            Don't have an account?{" "}
            <a href={`/signup/${roleParam}`}>Sign up as {roleParam}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
