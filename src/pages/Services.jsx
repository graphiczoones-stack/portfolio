import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Code, Smartphone, Globe, Search, Layers } from 'lucide-react';
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <Layout />,
            title: 'UI/UX Design',
            desc: 'Creating modern, clean, and user-centric designs that provide elite user experiences.'
        },
        {
            icon: <Code />,
            title: 'Web Development',
            desc: 'Building high-performance, scalable, and secure web applications using modern stacks.'
        },
        {
            icon: <Smartphone />,
            title: 'Responsive Design',
            desc: 'Ensuring your website looks and functions perfectly on all devices, from mobile to desktop.'
        },
        {
            icon: <Globe />,
            title: 'SEO Optimization',
            desc: 'Optimizing your web presence to rank higher in search results and attract more traffic.'
        },
        {
            icon: <Search />,
            title: 'Quality Assurance',
            desc: 'Thorough testing and debugging to ensure a bug-free and smooth performance.'
        },
        {
            icon: <Layers />,
            title: 'Fullstack Solutions',
            desc: 'Providing end-to-end development services from database design to frontend implementation.'
        }
    ];

    return (
        <div className="services-page container section-padding">
            <div className="section-header">
                <span className="section-subtitle">What I Offer</span>
                <h2>My Services</h2>
                <p>I provide a wide range of web development and design services tailored to meet your unique needs.</p>
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
                    >
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
