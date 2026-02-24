import React from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Github size={20} />, url: 'https://github.com/graphiczoones-stack', label: 'GitHub' },
        { icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/s3dawy', label: 'LinkedIn' },
        { icon: <MessageCircle size={20} />, url: 'https://wa.me/201157166373', label: 'WhatsApp' },
        { icon: <Mail size={20} />, url: 'mailto:ziads3dawy@gmail.com', label: 'Email' },
    ];

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-info">
                    <img src="/logoo.svg" alt="Ziad Sadawy Logo" className="footer-logo" />
                    <h3>ZIAD SADAWY</h3>
                    <p>Web Developer focused on creating modern, professional, and visually stunning web experiences.</p>
                </div>

                <div className="footer-links">
                    <div className="social-links">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="social-icon"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Ziad Mahmoud Mohammed Sadawy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
