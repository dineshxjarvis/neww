import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showReqs, setShowReqs] = useState(false);
  const navigate = useNavigate();

  const passwordReqs = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!Object.values(passwordReqs).every(Boolean)) {
      setAlert({ message: 'Please meet all password requirements.', type: 'danger' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/register', formData);
      if (response.data.success) {
        setAlert({ message: 'Account created! Redirecting to login...', type: 'success' });
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Registration failed.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5 min-vh-100 position-relative">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-5 w-100 shadow-premium" 
        style={{ maxWidth: '480px' }}
      >
        <div className="text-center mb-5">
          <div className="bg-primary bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '60px', height: '60px' }}>
            <i className="fa-solid fa-user-plus fs-3"></i>
          </div>
          <h2 className="fw-bold">Create Account</h2>
          <p className="text-muted">Join us today and secure your data</p>
        </div>

        {alert.message && (
          <div className={`alert alert-${alert.type} text-center shadow-sm`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-floating mb-4 premium-input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
            <label><i className="fa-solid fa-user me-2 text-primary"></i>Full Name</label>
          </div>
          
          <div className="form-floating mb-4 premium-input-group">
            <input 
              type="email" 
              className="form-control" 
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
            <label><i className="fa-solid fa-envelope me-2 text-primary"></i>Email address</label>
          </div>

          <div className="form-floating mb-2 premium-input-group">
            <input 
              type="password" 
              className="form-control" 
              placeholder="Password"
              onFocus={() => setShowReqs(true)}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
            <label><i className="fa-solid fa-key me-2 text-primary"></i>Password</label>
          </div>

          <AnimatePresence>
            {showReqs && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-4 px-3 overflow-hidden"
              >
                <div className={`small mb-1 ${passwordReqs.length ? 'text-success' : 'text-muted'}`}>
                  <i className={`fa-solid ${passwordReqs.length ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'} me-2`}></i>At least 8 characters
                </div>
                <div className={`small mb-1 ${passwordReqs.number ? 'text-success' : 'text-muted'}`}>
                  <i className={`fa-solid ${passwordReqs.number ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'} me-2`}></i>At least 1 number
                </div>
                <div className={`small mb-1 ${passwordReqs.special ? 'text-success' : 'text-muted'}`}>
                  <i className={`fa-solid ${passwordReqs.special ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'} me-2`}></i>At least 1 special character
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" disabled={loading} className="btn btn-premium w-100 py-3 fw-bold shadow-lg">
            {loading ? <><i className="fa-solid fa-spinner fa-spin me-2"></i>Creating Account...</> : 'Get Started'}
          </button>

          <div className="text-center mt-4">
            <p className="text-muted mb-0">Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Log in</Link></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
