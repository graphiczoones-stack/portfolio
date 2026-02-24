import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ExternalLink, ZoomIn } from 'lucide-react';
import './Certificates.css';

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    const certificates = [
        {
            id: 1,
            title: 'Modern Javascript ES6 and beyond',
            org: 'Professional Certification',
            date: '2024',
            image: '/certificates/images/Modern Javascript ES6 and beyond.jpg',
            category: 'Development'
        },
        {
            id: 2,
            title: 'React Js',
            org: 'Professional Certification',
            date: '2024',
            image: '/certificates/images/React Js.jpg',
            category: 'Development'
        },
        {
            id: 3,
            title: 'TypeScript Fundamentals',
            org: 'Professional Certification',
            date: '2024',
            image: '/certificates/images/TypeScript Fundamentals.jpg',
            category: 'Development'
        },
        {
            id: 4,
            title: 'Building Web Applications using PHP & Mysql',
            org: 'Full Stack Development',
            date: '2023',
            image: '/certificates/images/Building Web Applications using PHP  Mysql.jpg',
            category: 'Development'
        },
        {
            id: 5,
            title: 'Learn HTML & CSS',
            org: 'Front-End Basics',
            date: '2023',
            image: '/certificates/images/Learn HTML  CSS.jpg',
            category: 'Development'
        },
        {
            id: 6,
            title: 'Javascript',
            org: 'Core Fundamentals',
            date: '2023',
            image: '/certificates/images/Javascript.jpg',
            category: 'Development'
        },
        {
            id: 7,
            title: 'CCNA',
            org: 'Cisco Networking',
            date: '2023',
            image: '/certificates/images/CCNA.jpeg',
            category: 'Networking'
        },
        {
            id: 8,
            title: 'Graphic Design',
            org: 'Design Mastery',
            date: '2023',
            image: '/certificates/images/Graphic Design.jpeg',
            category: 'Design'
        },
        {
            id: 9,
            title: 'Web Design',
            org: 'UI/UX Principles',
            date: '2023',
            image: '/certificates/images/Web Design.jpeg',
            category: 'Design'
        },
        {
            id: 10,
            title: 'Create websites using WordPress',
            org: 'CMS Development',
            date: '2023',
            image: '/certificates/images/Create websites using WordPress.jpg',
            category: 'Development'
        },
        {
            id: 11,
            title: 'Getting started as freelancer (Upwork)',
            org: 'Freelance Training',
            date: '2023',
            image: '/certificates/images/Getting started as freelancer (Upwork).jpg',
            category: 'Freelancing'
        },
        {
            id: 12,
            title: 'Getting started as freelancer (Mostaql)',
            org: 'Freelance Training',
            date: '2023',
            image: '/certificates/images/Getting started as freelancer (Mostaql).jpg',
            category: 'Freelancing'
        },
        {
            id: 13,
            title: 'Getting started as freelancer (Khamsat)',
            org: 'Freelance Training',
            date: '2023',
            image: '/certificates/images/Getting started as freelancer (Khamsat).jpg',
            category: 'Freelancing'
        },
        {
            id: 14,
            title: 'Freelancing basic',
            org: 'Career Development',
            date: '2023',
            image: '/certificates/images/Freelancing basic.jpg',
            category: 'Freelancing'
        },
        {
            id: 15,
            title: 'Effective Business English Communication',
            org: 'Soft Skills Training',
            date: '2023',
            image: '/certificates/images/Effective Business English Communication.jpg',
            category: 'Communication'
        },
        {
            id: 16,
            title: 'The Art of Effective Communication Skills',
            org: 'Soft Skills Training',
            date: '2023',
            image: '/certificates/images/The Art of Effective Communication Skills.jpg',
            category: 'Communication'
        },
        {
            id: 17,
            title: 'CV writing',
            org: 'Career Growth',
            date: '2023',
            image: '/certificates/images/CV writing.jpg',
            category: 'Career'
        },
        {
            id: 18,
            title: 'The Principles of Writing Clean Code',
            org: 'Software Quality',
            date: '2023',
            image: '/certificates/images/The Principles of Writing Clean Code.jpg',
            category: 'Development'
        }
    ];

    return (
        <div className="certificates-page container section-padding">
            <div className="section-header">
                <span className="section-subtitle">Recognition</span>
                <h2>My Certificates</h2>
                <p>A collection of professional certifications that validate my skills and dedication to continuous learning.</p>
            </div>

            <div className="certs-modern-grid">
                {certificates.map((cert) => (
                    <motion.div
                        key={cert.id}
                        className="modern-cert-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedCert(cert)}
                    >
                        <div className="card-media">
                            <img src={cert.image} alt={cert.title} loading="lazy" />
                            <div className="card-overlay">
                                <ZoomIn size={32} />
                            </div>
                        </div>
                        <div className="card-details">
                            <span className="card-tag">{cert.category}</span>
                            <h3>{cert.title}</h3>
                            <p>{cert.org} • {cert.date}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedCert && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="cert-modal-overlay"
                            onClick={() => setSelectedCert(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="cert-modal"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="modal-close" onClick={() => setSelectedCert(null)}>
                                    <X size={24} />
                                </button>
                                <div className="modal-image-view">
                                    <img src={selectedCert.image} alt={selectedCert.title} />
                                </div>
                                <div className="modal-footer-info">
                                    <div className="info-group">
                                        <h3>{selectedCert.title}</h3>
                                        <p>{selectedCert.org} | {selectedCert.date}</p>
                                    </div>
                                    <div className="info-actions">
                                        <button className="btn btn-outline" onClick={() => setSelectedCert(null)}>
                                            Close View
                                        </button>
                                        <button className="btn btn-primary">
                                            <ExternalLink size={18} /> Verify
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Certificates;
