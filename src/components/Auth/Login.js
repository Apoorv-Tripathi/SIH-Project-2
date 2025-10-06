import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setError(result.message);
      }
    }, 1000);
  };

  // Quick login buttons for demo
  const quickLogin = (role) => {
    const credentials = {
      admin: { email: 'admin@edu.in', password: 'admin123' },
      student: { email: 'rahul@student.edu.in', password: 'student123' },
      teacher: { email: 'anita.desai@faculty.edu.in', password: 'teacher123' },
      institution: { email: 'admin@iitd.ac.in', password: 'institution123' }
    };

    setEmail(credentials[role].email);
    setPassword(credentials[role].password);

    setTimeout(() => {
      const result = login(credentials[role].email, credentials[role].password);
      if (result.success) {
        setIsAuthenticated(true);
      }
    }, 500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
              <div className="card-body p-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle p-3 mb-3"
                    style={{ width: '80px', height: '80px' }}>
                    <GraduationCap size={40} className="text-primary" />
                  </div>
                  <h3 className="fw-bold mb-2">Unified Education Interface</h3>
                  <p className="text-muted">Smart India Hackathon 2025</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <AlertCircle size={20} className="me-2" />
                    <div>{error}</div>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <div className="position-relative">
                      <Mail className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
                      <input
                        type="email"
                        className="form-control ps-5"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <div className="position-relative">
                      <Lock className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
                      <input
                        type="password"
                        className="form-control ps-5"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-4">
                  <p className="text-center text-muted small mb-3">Quick Login for Demo</p>
                  <div className="row g-2">
                    <div className="col-6">
                      <button
                        className="btn btn-outline-primary btn-sm w-100"
                        onClick={() => quickLogin('admin')}
                      >
                        Admin
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-outline-success btn-sm w-100"
                        onClick={() => quickLogin('student')}
                      >
                        Student
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-outline-warning btn-sm w-100"
                        onClick={() => quickLogin('teacher')}
                      >
                        Teacher
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-outline-info btn-sm w-100"
                        onClick={() => quickLogin('institution')}
                      >
                        Institution
                      </button>
                    </div>
                  </div>
                </div>

                {/* Demo Credentials Info */}
                <div className="mt-4 p-3 bg-light rounded">
                  <p className="small mb-2 fw-bold">Demo Credentials:</p>
                  <p className="small mb-1"><strong>Admin:</strong> admin@edu.in / admin123</p>
                  <p className="small mb-1"><strong>Student:</strong> rahul@student.edu.in / student123</p>
                  <p className="small mb-1"><strong>Teacher:</strong> anita.desai@faculty.edu.in / teacher123</p>
                  <p className="small mb-0"><strong>Institution:</strong> admin@iitd.ac.in / institution123</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-white small">
                © 2025 Unified Education Interface | SIH Problem Statement #1525
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;