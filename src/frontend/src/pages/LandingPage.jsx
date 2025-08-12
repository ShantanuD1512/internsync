import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import './LandingPage.css';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      el.id = `fade-${index}`;
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const smoothScroll = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <>
      <Header />
      <main className="landing-container">
        <div style={{
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.6,
          color: '#1e293b',
          overflowX: 'hidden',
          margin: 0,
          padding: 0
        }}>
          {/* Hero Section */}
          <section id="hero" className="hero-section">
            <div className="floating-shapes">
              <div className="shape"></div>
              <div className="shape"></div>
              <div className="shape"></div>
            </div>
            <div className="container">
              <div className="hero-content">
                <h1 className="hero-title">InternSync</h1>
                <p className="hero-subtitle">
                  The future of internship management. Connect students with opportunities, 
                  streamline applications, and build careers with our intelligent platform.
                </p>
                <div className="hero-buttons">
                  <button className="btn-hero btn-hero-primary" onClick={handleGetStarted}>
                    Get Started
                  </button>
                  <button className="btn-hero btn-hero-secondary" onClick={() => smoothScroll('#features')}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <div className={`stat-item fade-in ${isVisible['fade-0'] ? 'visible' : ''}`}>
                    <span className="stat-number">1000+</span>
                    <span className="stat-label">Active Students</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`stat-item fade-in ${isVisible['fade-1'] ? 'visible' : ''}`}>
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Partner Companies</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`stat-item fade-in ${isVisible['fade-2'] ? 'visible' : ''}`}>
                    <span className="stat-number">95%</span>
                    <span className="stat-label">Success Rate</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={`stat-item fade-in ${isVisible['fade-3'] ? 'visible' : ''}`}>
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Support Available</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="features-section">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 className={`section-title fade-in ${isVisible['fade-4'] ? 'visible' : ''}`}>Why Choose InternSync?</h2>
                <p className={`section-subtitle fade-in ${isVisible['fade-5'] ? 'visible' : ''}`}>
                  Discover the powerful features that make internship management effortless
                </p>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className={`feature-card fade-in ${isVisible['fade-6'] ? 'visible' : ''}`}>
                    <div className="feature-icon gradient-1">
                      💼
                    </div>
                    <h4 className="feature-title">Smart Matching</h4>
                    <p className="feature-text">
                      Matches students with relevant internship opportunities 
                      based on skills, preferences, and academic background.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className={`feature-card fade-in ${isVisible['fade-7'] ? 'visible' : ''}`}>
                    <div className="feature-icon gradient-2">
                      🛡️
                    </div>
                    <h4 className="feature-title">Verified Organizations</h4>
                    <p className="feature-text">
                      All partner organizations undergo rigorous verification to ensure 
                      authentic opportunities and safe working environments.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className={`feature-card fade-in ${isVisible['fade-8'] ? 'visible' : ''}`}>
                    <div className="feature-icon gradient-3">
                      📈
                    </div>
                    <h4 className="feature-title">Real-time Tracking</h4>
                    <p className="feature-text">
                      Track application status, interview schedules, and progress in real-time 
                      with instant notifications and updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="process-section">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 className={`section-title fade-in ${isVisible['fade-9'] ? 'visible' : ''}`}>How It Works</h2>
                <p className={`section-subtitle fade-in ${isVisible['fade-10'] ? 'visible' : ''}`}>
                  Simple steps to connect with your perfect internship opportunity
                </p>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <div className={`process-step fade-in ${isVisible['fade-11'] ? 'visible' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-connector"></div>
                    <h5 className="step-title">Create Profile</h5>
                    <p className="step-description">
                      Set up your profile with academic details, skills, and career preferences.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={`process-step fade-in ${isVisible['fade-12'] ? 'visible' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-connector"></div>
                    <h5 className="step-title">Browse & Apply</h5>
                    <p className="step-description">
                      Explore curated internship opportunities and apply with one click.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={`process-step fade-in ${isVisible['fade-13'] ? 'visible' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-connector"></div>
                    <h5 className="step-title">Get Matched</h5>
                    <p className="step-description">
                      Our AI matches you with suitable opportunities and manages interviews.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={`process-step fade-in ${isVisible['fade-14'] ? 'visible' : ''}`}>
                    <div className="step-number">4</div>
                    <h5 className="step-title">Start Your Journey</h5>
                    <p className="step-description">
                      Begin your internship with ongoing support and progress tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="testimonials-section">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 className={`section-title fade-in ${isVisible['fade-15'] ? 'visible' : ''}`}>What Our Users Say</h2>
                <p className={`section-subtitle fade-in ${isVisible['fade-16'] ? 'visible' : ''}`}>
                  Hear from students and organizations who've found success with InternSync
                </p>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className={`testimonial-card fade-in ${isVisible['fade-17'] ? 'visible' : ''}`}>
                    <p className="testimonial-text">
                      InternSync transformed my internship search completely. The platform's 
                      intuitive interface and smart matching helped me land my dream internship 
                      at a top tech company within just two weeks.
                    </p>
                    <div className="testimonial-author">
                      <div className="author-avatar">PS</div>
                      <div className="author-info">
                        <h6>Priya Sharma</h6>
                        <small>Computer Science Student, NIT Delhi</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={`testimonial-card fade-in ${isVisible['fade-18'] ? 'visible' : ''}`}>
                    <p className="testimonial-text">
                      As an HR manager, InternSync has streamlined our recruitment process 
                      significantly. We can now identify and connect with top talent 
                      efficiently, saving both time and resources.
                    </p>
                    <div className="testimonial-author">
                      <div className="author-avatar">AK</div>
                      <div className="author-info">
                        <h6>Amit Kumar</h6>
                        <small>Talent Acquisition Manager, TechCorp</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="container">
              <div className="fade-in">
                <h2 className="cta-title">Ready to Start Your Journey?</h2>
                <p className="cta-subtitle">
                  Join thousands of students and organizations already using InternSync 
                  to build successful careers and partnerships.
                </p>
                <div>
                  <button className="btn-hero btn-hero-primary" onClick={handleGetStarted}>
                    Sign Up Now
                  </button>
                  <button className="btn-hero btn-hero-secondary" onClick={() => smoothScroll('#contact')}>
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact-section">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 className={`section-title fade-in ${isVisible['fade-19'] ? 'visible' : ''}`}>Get In Touch</h2>
                <p className={`section-subtitle fade-in ${isVisible['fade-20'] ? 'visible' : ''}`}>
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className={`contact-info fade-in ${isVisible['fade-21'] ? 'visible' : ''}`}>
                    <div className="contact-item">
                      <div className="contact-icon gradient-1">
                        📧
                      </div>
                      <div className="contact-details">
                        <h5>Email Us</h5>
                        <p>support@internsync.com</p>
                        <p>info@internsync.com</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon gradient-2">
                        📞
                      </div>
                      <div className="contact-details">
                        <h5>Call Us</h5>
                        <p>+91 98765 43210</p>
                        <p>+91 87654 32109</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon gradient-3">
                        📍
                      </div>
                      <div className="contact-details">
                        <h5>Visit Us</h5>
                        <p>123 Tech Park, Sector 15</p>
                        <p>Gurugram, Haryana 122001</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={`contact-form fade-in ${isVisible['fade-22'] ? 'visible' : ''}`}>
                    <form>
                      <div className="form-group">
                        <input type="text" placeholder="Your Name" className="form-control" required />
                      </div>
                      <div className="form-group">
                        <input type="email" placeholder="Your Email" className="form-control" required />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Subject" className="form-control" required />
                      </div>
                      <div className="form-group">
                        <textarea placeholder="Your Message" className="form-control" rows="5" required></textarea>
                      </div>
                      <button type="submit" className="btn-hero btn-hero-primary" style={{ width: '100%' }}>
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;