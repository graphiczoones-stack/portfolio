import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, ArrowRight, ExternalLink, X } from 'lucide-react';
import './Services.css';

const KhamsatIcon = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="360 280 360 520"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M363.36 520.38c8.82-15.12 19.56-29.04 32.09-41.57 15.17-15.17 32.36-27.71 51.27-37.4v-78.05h60.53V280H363.36zM446.72 473.32c-49 30.54-81.95 84.4-83.31 146.07-.02.66-.03 1.32-.04 1.98s-.01 1.32-.01 1.98h83.36c0-39.91 25.21-74.06 60.53-87.35v-86.24c-21.85 4.11-42.3 12.27-60.53 23.65zM363.57 716.64h143.68V800H363.57zM540 446.72c-1.66 0-3.31.02-4.96.08v83.41c1.64-.09 3.29-.13 4.96-.13 51.43 0 93.28 41.85 93.28 93.28s-41.85 93.28-93.28 93.28h-4.96V800H540c97.4 0 176.64-79.24 176.64-176.64S637.4 446.72 540 446.72zM535.04 280h156.79v83.36H535.04z" />
    </svg>
);

const RedirectModal = ({ service, isOpen, onClose }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    if (!isOpen || !service || !mounted) return null;

    const platform = service.url.includes('mostaql.com') ? 'Mostaql' : 'Khamsat';

    const modalContent = (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content glass"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className="modal-header">
                        <div className="modal-icon">{service.icon}</div>
                        <h3>External Redirection</h3>
                    </div>

                    <div className="modal-body">
                        <p>You are about to be redirected to <strong>{platform}</strong> to view the service:</p>
                        <h4 className="service-redirect-title">{service.title}</h4>
                        <p className="redirect-note">This service is hosted on an external platform. Click "Continue" to proceed or "Cancel" to stay here.</p>
                    </div>

                    <div className="modal-actions">
                        <a
                            href={service.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-continue"
                            onClick={onClose}
                        >
                            Continue to {platform}
                            <ExternalLink size={18} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const services = [
        {
            icon: <img src="/id2dnSKj5J_1772941567353.png" alt="Mostaql" className="service-img-icon" />,
            title: 'Customized Work Request',
            desc: 'If you need a specific service or project not listed, you can request custom work tailored to your needs. Send your details, and I will contact you to execute it perfectly.',
            url: 'https://mostaql.com/u/Sadawiy'
        },
        {
            icon: <KhamsatIcon size={32} />,
            title: 'Professional Website Creation',
            desc: 'Designing and developing fast, professional, and responsive websites using the latest technologies, with a focus on elite user experience and performance.',
            url: 'https://khamsat.com/programming/custom-website-development/4111681-%D8%A5%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A-%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A-%D8%B3%D8%B1%D9%8A%D8%B9-%D9%88%D9%85%D8%AA%D9%88%D8%A7%D9%81%D9%82-%D9%85%D8%B9-%D8%AC%D9%85%D9%8A%D8%B9-%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9'
        },
        {
            icon: <KhamsatIcon size={32} />,
            title: 'Convert Website to Android App',
            desc: 'Quickly convert your website into a professional Android app using WebView technology, allowing you to launch your app easily while maintaining full functionality.',
            url: 'https://khamsat.com/programming/convert-site-to-app/4109988-%D8%AA%D8%AD%D9%88%D9%8A%D9%84-%D9%85%D9%88%D9%82%D8%B9%D9%83-%D8%A5%D9%84%D9%89-%D8%AA%D8%B7%D8%A8%D9%8A%D9%82-android-%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A-%D8%A8%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85-webview-%D8%A8%D8%B3%D8%B1%D8%B9%D8%A9'
        },
        {
            icon: <KhamsatIcon size={32} />,
            title: 'Logo & Visual Identity Design',
            desc: 'Designing unique logos that reflect your brand identity, with attention to visual details that help build a strong, professional, and distinctive brand image.',
            url: 'https://khamsat.com/designing/logo-design/4111114-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A-%D9%88%D9%81%D8%B1%D9%8A%D8%AF-%D9%8A%D8%B9%D8%A8%D8%B1-%D8%B9%D9%86-%D9%87%D9%88%D9%8A%D8%A9-%D8%B9%D9%84%D8%A7%D9%85%D8%AA%D9%83-%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9'
        }
    ];

    return (
        <div className="services-page container section-padding">
            <div className="section-header">
                <span className="section-subtitle">What I Offer</span>
                <h2>My Services</h2>
                <p>I provide a wide range of professional web design and development services tailored to your specific needs.</p>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="service-card glass"
                        onClick={() => handleServiceClick(service)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                        <div className="service-action">
                            <span>View Service</span>
                            <ArrowRight size={18} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <RedirectModal
                service={selectedService}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Services;
