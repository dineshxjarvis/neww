import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ message: '', type: '' });

    try {
      const response = await axios.post('/api/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_name', response.data.name);
        
        window.location.href = '/profile';
      }
    } catch (err) {
      setAlert({ 
        message: err.response?.data?.message || 'Invalid credentials or server error.', 
        type: 'danger' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5 min-vh-100 position-relative">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 w-100 shadow-premium" 
        style={{ maxWidth: '450px' }}
      >
        <div className="text-center mb-5">
          <div className="bg-primary bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '60px', height: '60px' }}>
            <i className="fa-solid fa-lock fs-3"></i>
          </div>
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">Enter your credentials to access your account</p>
        </div>

        {alert.message && (
          <div className={`alert alert-${alert.type} text-center fade show`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-4 premium-input-group">
            <input 
              type="email" 
              className="form-control" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <label><i className="fa-solid fa-envelope me-2 text-primary"></i>Email address</label>
          </div>
          
          <div className="form-floating mb-4 premium-input-group position-relative">
            <input 
              type={showPassword ? "text" : "password"} 
              className="form-control" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <label><i className="fa-solid fa-key me-2 text-primary"></i>Password</label>
            <button 
              type="button" 
              className="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent text-muted"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn btn-premium w-100 py-3 fw-bold shadow-lg mt-2">
            {loading ? <><i className="fa-solid fa-spinner fa-spin me-2"></i>Verifying...</> : 'Log In'}
          </button>

          <div className="text-center mt-4">
            <p className="text-muted mb-0">Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create Account</Link></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
