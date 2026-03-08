import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const TikTokIcon = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.11-2.85-.56-4.16-1.57-.44 3.98-3.9 14.56-11.27 15.51C3.58 24.36.43 21.07.05 17.51c-.4-3.79 2.22-7.58 5.92-8.31V13.2c-1.89.35-3.05 2.1-2.9 3.98.15 1.88 1.72 3.32 3.6 3.17 1.88-.15 3.32-1.72 3.17-3.6V0h2.69z" />
    </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.623 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <Github size={20} />, url: 'https://github.com/graphiczoones-stack', label: 'GitHub' },
        { icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/s3dawy', label: 'LinkedIn' },
        { icon: <WhatsAppIcon size={20} />, url: 'https://wa.me/201157166373', label: 'WhatsApp' },
        { icon: <Instagram size={20} />, url: 'https://www.instagram.com/s3dawiy/', label: 'Instagram' },
        {
            icon: <img src="/tiktok-48.ico" alt="TikTok" style={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }} />,
            url: 'https://www.tiktok.com/@s3dawiy',
            label: 'TikTok'
        },
    ];

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-info">
                    <img src="/logoo.svg" alt="Ziad Sadawy Logo" className="footer-logo" />
                    <h3>
                        ZIAD SADAWY
                        <img src="/Verified.png" alt="Verified" className="verified-badge" />
                    </h3>
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

