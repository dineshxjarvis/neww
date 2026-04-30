import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ dob: '', age: '', contact: '' });
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const userName = localStorage.getItem('user_name') || 'Dinesh Kumar AS';

  useEffect(() => {
    if (!token) navigate('/login');
    fetchProfile();
  }, [token, navigate]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/profile', {
        params: { user_id: userId },
        headers: { Authorization: token }
      });
      if (res.data.status === 'success' && res.data.data) {
        setProfile(res.data.data);
      }
    } catch (err) {
      console.error("Fetch profile failed", err);
    }
  };

  const calculateAge = (dobValue) => {
    if (!dobValue) return;
    const birthDate = new Date(dobValue);
    const today = new Date();
    let targetAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) targetAge--;
    
    // Smooth counting animation
    let currentAge = 0;
    const duration = 500; // ms
    const stepTime = Math.abs(Math.floor(duration / targetAge));
    
    setProfile(prev => ({ ...prev, dob: dobValue, age: 0 }));

    const timer = setInterval(() => {
      currentAge++;
      setProfile(prev => ({ ...prev, age: currentAge }));
      if (currentAge >= targetAge) clearInterval(timer);
    }, stepTime);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Validation: Ensure contact has 12 digits (+91 + 10 digits)
    const digits = profile.contact.replace(/\D/g, '');
    if (digits.length < 12) {
      setAlert({ message: 'Please enter a complete 10-digit phone number.', type: 'danger' });
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/profile', { ...profile, user_id: userId }, {
        headers: { Authorization: token }
      });
      setAlert({ message: 'Profile updated successfully!', type: 'success' });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    } catch (err) {
      setAlert({ message: 'Error updating profile.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 bg-white" style={{background: '#f8faff'}}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light py-3">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary">
            <i className="fa-solid fa-shield-halved me-2"></i>DINESH KUMAR AS
          </span>
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1 border-danger text-danger bg-white" style={{fontSize: '12px'}}>
            <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8" style={{maxWidth: '850px'}}>
            <div className="bg-white rounded-5 shadow-sm border-0 overflow-hidden position-relative">
              
              {/* Premium Header Banner with Custom Image */}
              <div className="p-5 text-white text-center position-relative overflow-hidden" 
                style={{ 
                  backgroundImage: 'url(/assets/booth/profile_banner.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  aspectRatio: '16 / 5'
                }}>
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: 'rgba(0,0,0,0.1)'}}></div>
                
                <div className="mt-2 position-relative z-index-1" style={{minHeight: '120px'}}>
                  {/* Text removed because it is already in the banner image */}
                </div>
              </div>

              {/* Overlapping Avatar */}
              <div className="text-center" style={{marginTop: '-65px'}}>
                <img 
                  src="/assets/booth/avatar_view_1.png" 
                  alt="Avatar" 
                  className="rounded-circle border border-5 border-white shadow-lg position-relative z-index-2" 
                  style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                />
              </div>

              {/* Profile Body */}
              <div className="p-5 pt-4 text-center">
                <h3 className="fw-bold mb-1">Hi, {userName}</h3>
                <p className="text-muted small mb-5">Personalize your account details</p>

                {alert.message && <div className={`alert alert-${alert.type} small py-2 mb-4`}>{alert.message}</div>}

                <form onSubmit={handleUpdate} className="text-start">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="small text-primary fw-bold mb-2"><i className="fa-solid fa-calendar-day me-2"></i>Date of Birth</label>
                        <input 
                          type="date" 
                          className="form-control bg-light border-0 py-2" 
                          value={profile.dob || ''} 
                          onChange={(e) => calculateAge(e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="small text-primary fw-bold mb-2"><i className="fa-solid fa-user me-2"></i>Age</label>
                        <input 
                          type="text" 
                          className="form-control bg-light border-0 py-2" 
                          value={profile.age || ''} 
                          readOnly 
                          placeholder="Auto-calculated" 
                        />
                        <div className="text-muted mt-1" style={{fontSize: '9px'}}>AUTO-CALCULATED FROM DOB</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="small text-primary fw-bold mb-2"><i className="fa-solid fa-phone me-2"></i>Contact Number</label>
                        <input 
                          type="tel" 
                          className="form-control bg-light border-0 py-2" 
                          placeholder="+91 00000 00000" 
                          value={profile.contact || ''} 
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
                            if (val.length > 12) val = val.substring(0, 12);
                            
                            let formatted = val;
                            if (val.length > 0) {
                              formatted = '+' + val.substring(0, 2);
                              if (val.length > 2) formatted += ' ' + val.substring(2, 7);
                              if (val.length > 7) formatted += ' ' + val.substring(7, 12);
                            }
                            setProfile({...profile, contact: formatted});
                          }} 
                        />
                        <div className="text-muted mt-1" style={{fontSize: '9px'}}>FORMAT: +91 00000 00000</div>
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-lg" style={{background: '#4a6cf7', border: 'none'}}>
                    <i className="fa-solid fa-circle-check me-2"></i>Save Profile Changes
                  </button>
                </form>

                <div className="mt-5 text-muted small d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-lock me-2 text-dark"></i> Your data is stored securely in MongoDB
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
