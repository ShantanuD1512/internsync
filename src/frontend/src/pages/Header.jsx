import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo" onClick={() => navigate('/')}>
            <div className="logo-icon">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
            <span className="logo-text">InternSync</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <button onClick={() => scrollToSection('hero')} className="nav-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="nav-link">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
                  How it Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="nav-link">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="nav-link">
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Single Auth Button */}
          <div className="auth-buttons">
            <button 
              className="btn-auth btn-signin"
              onClick={() => navigate('/login')}
            >
              Sign In / Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            <li>
              <button onClick={() => scrollToSection('hero')} className="mobile-nav-link">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('features')} className="mobile-nav-link">
                Features
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('how-it-works')} className="mobile-nav-link">
                How it Works
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('testimonials')} className="mobile-nav-link">
                Testimonials
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">
                Contact
              </button>
            </li>
            <li className="mobile-auth-buttons">
              <button 
                className="btn-auth btn-signin mobile"
                onClick={() => navigate('/login')}
              >
                Sign In / Sign Up
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;