import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Layout, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-content"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="hero-badge-wrapper"
                    >
                        <span className="hero-badge">Available for New Projects</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        I'm <span className="text-gradient">Ziad Sadawy</span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="hero-subtitle"
                    >
                        Crafting High-End Digital Experiences
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hero-description"
                    >
                        A full-stack web developer specializing in building <strong>fast, scalable, and user-friendly</strong> websites,
                        enhanced with engaging motion design to create visually compelling digital experiences.
                        With strong expertise in performance and user experience, businesses are empowered to attract more customers
                        and convert visitors into loyal clients.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="hero-actions"
                    >
                        <Link to="/projects" className="btn btn-primary btn-lg">
                            Get Started <ArrowRight size={20} />
                        </Link>
                        <Link to="/contact" className="btn btn-outline btn-lg">
                            Contact Me
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Performance-focused abstract visual */}
                <div className="hero-background-effects">
                    <div className="glow-orb primary-glow"></div>
                    <div className="glow-orb accent-glow"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
