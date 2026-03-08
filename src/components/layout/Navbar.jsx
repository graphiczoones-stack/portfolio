import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import GooeyNav from '../common/GooeyNav/GooeyNav';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Skills', href: '/skills' },
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-content">
        <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/logoo.svg" alt="Ziad Sadawy Logo" className="logo-img" />
          <span style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ZIAD S3DAWY
            <img src="/Verified.png" alt="Verified" className="verified-badge-nav" />
          </span>
        </Link>

        <div className="desktop-nav">
          <GooeyNav
            items={navLinks}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        <button className="mobile-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={toggleMobileMenu}
          >
            <nav className="mobile-nav" onClick={e => e.stopPropagation()}>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={(location.pathname === link.href) || (link.href !== '/' && location.pathname.startsWith(link.href)) ? 'active' : ''}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
