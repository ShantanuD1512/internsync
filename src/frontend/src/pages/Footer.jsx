import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="row">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="footer-section">
                <div className="footer-logo">
                  <div className="footer-logo-icon">
                    ⚡
                  </div>
                  <span className="footer-logo-text">InternSync</span>
                </div>
                <p className="footer-description">
                  Connecting students with meaningful internship opportunities. 
                  Build your career with our intelligent platform designed for success.
                </p>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    💼
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    🐦
                  </a>
                  <a href="#" className="social-link" aria-label="Facebook">
                    📘
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    📷
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 mb-4">
              <div className="footer-section">
                <h5 className="footer-title">Quick Links</h5>
                <ul className="footer-links">
                  <li>
                    <button onClick={() => scrollToSection('hero')} className="footer-link">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('features')} className="footer-link">
                      Features
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('how-it-works')} className="footer-link">
                      How it Works
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('testimonials')} className="footer-link">
                      Testimonials
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* For Students
            <div className="col-lg-2 col-md-6 mb-4">
              <div className="footer-section">
                <h5 className="footer-title">For Students</h5>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Find Internships</a></li>
                  <li><a href="#" className="footer-link">Career Guide</a></li>
                  <li><a href="#" className="footer-link">Resume Builder</a></li>
                  <li><a href="#" className="footer-link">Interview Tips</a></li>
                </ul>
              </div>
            </div> */}

            {/* For Organizations
            <div className="col-lg-2 col-md-6 mb-4">
              <div className="footer-section">
                <h5 className="footer-title">For Organizations</h5>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Post Internships</a></li>
                  <li><a href="#" className="footer-link">Find Talent</a></li>
                  <li><a href="#" className="footer-link">Pricing</a></li>
                  <li><a href="#" className="footer-link">Enterprise</a></li>
                </ul>
              </div>
            </div> */}

            {/* Support */}
            <div className="col-lg-2 col-md-6 mb-4">
              <div className="footer-section">
                <h5 className="footer-title">Support</h5>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Help Center</a></li>
                  <li>
                    <button onClick={() => scrollToSection('contact')} className="footer-link">
                      Contact Us
                    </button>
                  </li>
                  <li><a href="#" className="footer-link">Privacy Policy</a></li>
                  <li><a href="#" className="footer-link">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter-section">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h4 className="newsletter-title">Stay Updated</h4>
              <p className="newsletter-description">
                Get the latest internship opportunities and career tips delivered to your inbox.
              </p>
            </div>
            <div className="col-lg-6">
              <form className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    className="newsletter-input" 
                    placeholder="Enter your email address"
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                © {currentYear} InternSync. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="project-info">
                Built with ❤️ for CDAC Project
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;