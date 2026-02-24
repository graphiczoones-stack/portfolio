import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search } from 'lucide-react';
import './Projects.css';

const Projects = () => {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Development', 'Business', 'E-commerce'];

    const projects = [
        {
            id: 1,
            title: 'YOU,R',
            category: 'Development',
            image: '/Projects/YOU,R.svg',
            description: 'A student life management platform helping university students organize academic tasks, schedules, and daily study activities.',
            tags: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
            demoUrl: 'https://your-official.netlify.app',
            githubUrl: '#'
        },
        {
            id: 2,
            title: 'FOQ Game',
            category: 'Development',
            image: '/Projects/FOQ.svg',
            description: 'An interactive multiplayer-style web game designed for engaging gameplay and smooth user experience with friends.',
            tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
            demoUrl: 'https://foq.vercel.app',
            githubUrl: '#'
        },
        {
            id: 3,
            title: 'Write CV',
            category: 'Development',
            image: '/Projects/cv.svg',
            description: 'A professional online resume builder that generates ready-to-use CVs from user information in real-time.',
            tags: ['React', 'Modern JS', 'CSS Modules', 'Vercel'],
            demoUrl: 'https://write-cv.vercel.app',
            githubUrl: '#'
        },
        {
            id: 4,
            title: 'Le Marché Shop',
            category: 'E-commerce',
            image: '/Projects/lemarche.png',
            description: 'A premium full-scale e-commerce solution with a clean interface and seamless shopping flow.',
            tags: ['Modern Stack', 'E-commerce', 'Mobile Responsive'],
            demoUrl: 'https://lemarche-shop.com',
            githubUrl: '#',
            lightBackground: true
        },
        {
            id: 5,
            title: 'Njzaabi Law Firm',
            category: 'Business',
            image: '/Projects/Njzaabi_Logo-Black-01.svg',
            description: 'A formal legal firm website showcasing professional services and firm information with a focus on trust.',
            tags: ['Corporate UI', 'SEO', 'Business Strategy'],
            demoUrl: 'https://njzaabi.com',
            githubUrl: '#'
        }
    ];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="projects-page container section-padding">
            <div className="section-header">
                <span className="section-subtitle">Portfolio</span>
                <h2>Featured Projects</h2>
                <p>A selection of my recent work, ranging from complex web applications to elegant UI designs.</p>
            </div>

            <div className="filter-container">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <motion.div layout className="projects-grid">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="project-card glass"
                        >
                            <div className={`project-image ${project.lightBackground ? 'light-bg' : ''}`}>
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="overlay-links">
                                        <a href={project.demoUrl} target="_blank" rel="noreferrer" title="Live Demo"><ExternalLink size={20} /></a>
                                        <a href={project.githubUrl} target="_blank" rel="noreferrer" title="GitHub"><Github size={20} /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-info">
                                <span className="project-category">{project.category}</span>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="project-footer">
                                    <a href={project.demoUrl} className="btn-link">Live Demo</a>
                                    <a href={project.githubUrl} className="btn-link">Source Code</a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Projects;
