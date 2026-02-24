import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Settings, Palette } from 'lucide-react';
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Web Development',
            icon: <Code2 size={24} />,
            class: 'card-web',
            skills: [
                'PHP', 'Laravel', 'JavaScript (ES6+)', 'HTML5', 'CSS3',
                'Bootstrap', 'Responsive Design', 'RESTful APIs'
            ]
        },
        {
            title: 'Mobile Development',
            icon: <Settings size={24} />,
            class: 'card-mobile',
            skills: [
                'Flutter', 'Dart', 'Cross-Platform App Development',
                'Firebase Integration', 'GetX / Riverpod'
            ]
        },
        {
            title: 'Design Tools',
            icon: <Palette size={24} />,
            class: 'card-design',
            skills: [
                'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'
            ]
        },
        {
            title: 'Soft Skills',
            icon: <Server size={24} />, /* Reusing Server icon or choosing another if needed */
            class: 'card-soft',
            skills: [
                'Communication', 'Teamwork', 'Problem Solving', 'Time Management',
                'Adaptability', 'Critical Thinking', 'Creativity', 'Leadership',
                'Work Ethic', 'Flexibility', 'Conflict Resolution', 'Decision Making',
                'Stress Management', 'Active Listening', 'Collaboration'
            ]
        }
    ];

    return (
        <div className="skills-page container section-padding">
            <div className="section-header">
                <span className="section-subtitle">Expertise</span>
                <h2>Skills & Proficiencies</h2>
                <p>A showcase of my technical stack and professional soft skills acquired through years of experience.</p>
            </div>

            <div className="skills-bento-grid">
                {skillCategories.map((cat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className={`skill-bento-card glass ${cat.class}`}
                    >
                        <div className="card-top">
                            <div className="card-icon">{cat.icon}</div>
                            <h3>{cat.title}</h3>
                        </div>
                        <div className="card-tags">
                            {cat.skills.map((skill, sIdx) => (
                                <motion.span
                                    key={sIdx}
                                    className="skill-tag"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + (sIdx * 0.05) }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                        <div className="card-glow" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
