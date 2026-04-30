import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-vh-100 bg-white">
      {/* Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            <i className="fa-solid fa-shield-halved me-2"></i>DINESH KUMAR AS
          </Link>
          <div className="ms-auto d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-primary rounded-pill px-3 py-1 me-2 small">Log In</Link>
            <Link to="/register" className="btn btn-primary rounded-pill px-3 py-1 small">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-4">
              {`</>`} Full-Stack Internship Challenge
            </div>
            <h1 className="display-4 fw-bold mb-4">
              The <span className="text-primary">Secured</span> Identity Platform.
            </h1>
            <p className="text-muted mb-5">
              A high-fidelity authentication system featuring secure Redis sessions, MongoDB profiles, and MySQL data management.
            </p>
            <div className="d-flex gap-3">
              <Link to="/register" className="btn btn-primary rounded-pill px-4 py-2">Get Started Today</Link>
              <a href="#work" className="btn btn-light border rounded-pill px-4 py-2">View Projects</a>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <div className="position-relative d-inline-block">
              <div className="bg-white p-2 shadow-sm rounded-4 border">
                <img src="/assets/booth/banner_view_2.png" alt="Dashboard" className="img-fluid rounded-3" style={{maxWidth: '100%'}} />
              </div>
              <div className="position-absolute top-0 start-0 translate-middle bg-white p-2 rounded-3 shadow-sm border">
                <i className="fa-solid fa-lock text-primary"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Developer */}
      <section className="container py-5">
        <div className="bg-light rounded-4 p-5 border">
          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <div className="position-relative d-inline-block mb-3">
                <img src="/assets/booth/avatar_view_1.png" alt="Avatar" className="rounded-circle border border-4 border-white shadow-sm" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1 border border-2 border-white">
                  <i className="fa-solid fa-graduation-cap text-white small" style={{fontSize: '10px'}}></i>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="text-primary fw-bold small text-uppercase mb-2">About the Developer</div>
              <h2 className="fw-bold mb-3">Dinesh Kumar AS</h2>
              <p className="text-muted small">
                Motivated AIML undergraduate at CIT Chennai with strong expertise in Python, Java, machine learning, and computer vision. Experienced in building AI-driven solutions including medical diagnosis systems, predictive models, and applications like FIGGY. Possesses strong problem-solving and communication skills, with a passion for developing impactful real-world solutions and continuously advancing in AI and technology.
              </p>
                  <div className="d-flex gap-3 mt-3 fs-4">
                    <a href="https://github.com/dineshkumarAS-creator" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github text-dark"></i></a>
                    <a href="https://www.linkedin.com/in/dinesh-kumar-as-3049a8277" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin text-primary"></i></a>
                    <a href="mailto:dineshkumaras.aiml2024@citchennai.net"><i className="fa-solid fa-envelope text-danger"></i></a>
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container py-5" id="work">
        <div className="text-center mb-5">
          <div className="text-primary fw-bold small text-uppercase">My Work & Expertise</div>
          <h2 className="fw-bold">The <span className="text-primary">Bento</span> Portfolio</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-8">
            <div className="bg-light p-5 rounded-4 h-100 border position-relative overflow-hidden">
              <div className="badge bg-primary rounded-pill mb-3">Featured Project</div>
              <h4 className="fw-bold">FIGGY</h4>
              <p className="text-muted small">AI-Powered Parametric Income Insurance for Gig Workers. Built an AI-driven income protection system using machine learning models to automate insurance claims.</p>
              <div className="d-flex gap-2 mt-4">
                <span className="badge border text-muted">Machine Learning</span>
                <span className="badge border text-muted">Blockchain</span>
                <span className="badge border text-muted">Python</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-5 rounded-4 h-100 text-white" style={{ background: '#9d7dfa' }}>
              <i className="fa-solid fa-brain mb-3 fs-3"></i>
              <h5 className="fw-bold mb-4">AI & ML Expertise</h5>
              <ul className="list-unstyled small opacity-75">
                <li className="mb-2">● TensorFlow & PyTorch</li>
                <li className="mb-2">● Computer Vision (CNNs)</li>
                <li className="mb-2">● Scikit-Learn & Pandas</li>
                <li>● Model Evaluation</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-5 rounded-4 h-100 border">
              <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-2 mb-3">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h5 className="fw-bold">Ocular AI</h5>
              <p className="text-muted small">AI-Based Ocular Disease Detection using CNNs and iris segmentation to classify ocular diseases with high accuracy.</p>
              <div className="d-flex gap-2 mt-3">
                <span className="badge border text-muted small">Computer Vision</span>
                <span className="badge border text-muted small">Medical AI</span>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="bg-dark p-5 rounded-4 h-100 text-white">
              <div className="d-flex align-items-center mb-4">
                <i className="fa-solid fa-layer-group text-primary me-2"></i>
                <h5 className="fw-bold mb-0">Tech Stack & Tools</h5>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {['Java', 'Flutter', 'Next.js', 'MongoDB', 'Supabase', 'Postman', 'Git/GitHub'].map(t => (
                  <span key={t} className="badge bg-secondary bg-opacity-25 px-3 py-2">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="container py-5 text-center border-top">
        <div className="d-flex justify-content-center gap-3 mb-3 fs-4">
          <a href="https://github.com/dineshkumarAS-creator" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github text-muted"></i></a>
          <a href="https://www.linkedin.com/in/dinesh-kumar-as-3049a8277" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin text-muted"></i></a>
          <a href="mailto:dineshkumaras.aiml2024@citchennai.net"><i className="fa-solid fa-envelope text-muted"></i></a>
        </div>
        <div className="text-muted small">© 2024 Dinesh Kumar AS. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Home;
