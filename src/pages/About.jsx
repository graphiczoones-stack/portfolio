import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Award, Zap, Heart } from 'lucide-react';
import ProfileCard from '../components/common/ProfileCard';
import './About.css';

const About = () => {
    const navigate = useNavigate();
    const experience = [
        {
            role: 'Full-Stack Developer',
            company: 'Freelance',
            period: 'Mar 2024 – Present',
            points: [
                'Developing and maintaining full-stack web applications using React, Node.js, and REST APIs',
                'Designing responsive and user-friendly interfaces with HTML, CSS, JavaScript',
                'Building and integrating backend services and databases (MySQL / MongoDB)',
                'Implementing authentication, authorization, and secure data handling',
                'Collaborating with clients remotely to gather requirements and deliver solutions',
                'Optimizing application performance and fixing bugs',
                'Deploying applications and managing hosting environments'
            ]
        },
        {
            role: 'Graphic & Motion Designer',
            company: 'Freelance',
            period: 'Nov 2025 – Present',
            points: [
                'Designing visual content for social media, websites, and marketing campaigns',
                'Creating motion graphics and animations using After Effects',
                'Developing brand identities including logos, color palettes, and typography',
                'Producing promotional videos, intros, and short animations',
                'Collaborating remotely with clients to understand design requirements',
                'Editing and enhancing visuals using Photoshop & Illustrator',
                'Delivering high-quality designs within deadlines'
            ]
        }
    ];

    const education = {
        degree: "Bachelor's Degree (In Progress)",
        institution: 'TAIBA HIGHER INSTITUTE FOR TECHNOLOGY',
        period: '2023 – 2027',
        focus: 'Studying Computer Science with a focus on programming and software development. Practical experience in web technologies and real-world projects.'
    };

    return (
        <div className="about-page container section-padding">
            <div className="about-grid">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="about-image-side"
                >
                    <ProfileCard
                        name="Ziad Sadawy"
                        title="Full-Stack Developer & Designer"
                        handle="ziads3dawy"
                        status="Available"
                        contactText="Contact"
                        avatarUrl="/me.jpeg"
                        showUserInfo
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => navigate('/contact')}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="about-content"
                >
                    <span className="section-subtitle">Professional Summary</span>
                    <h2>Elevating Digital Identities</h2>
                    <p className="bio-lead">
                        A highly versatile and innovative professional with a robust background in full-stack web and mobile application development...
                    </p>
                    <p className="bio-text">
                        Complemented by extensive expertise in graphic design, motion graphics, and cutting-edge AI-powered video production.
                        Adept at delivering comprehensive digital solutions that empower businesses, startups, and personal brands to
                        establish a strong, consistent online identity, create compelling visual content, enhance customer engagement,
                        and drive significant growth in their digital presence.
                    </p>

                    <div className="cv-sections-grid">
                        <section className="cv-section">
                            <h3 className="section-title-sm">Work Experience</h3>
                            <div className="experience-list">
                                {experience.map((exp, idx) => (
                                    <div key={idx} className="experience-card">
                                        <div className="exp-header">
                                            <h4>{exp.role} <span>at {exp.company}</span></h4>
                                            <span className="exp-date">{exp.period}</span>
                                        </div>
                                        <ul className="exp-points">
                                            {exp.points.map((pt, i) => <li key={i}>{pt}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="cv-section">
                            <h3 className="section-title-sm">Education</h3>
                            <div className="education-card">
                                <div className="edu-header">
                                    <h4>{education.degree}</h4>
                                    <span className="edu-date">{education.period}</span>
                                </div>
                                <p className="edu-inst">{education.institution}</p>
                                <p className="edu-focus">{education.focus}</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
