import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
    const reviews = [
        {
            name: 'Alex Johnson',
            role: 'CEO at TechStream',
            comment: 'Ziad delivered an exceptional website that exceeded our expectations. His attention to detail and modern design sense is outstanding.',
            rating: 5
        },
        {
            name: 'Sarah Miller',
            role: 'Marketing Manager',
            comment: 'Working with Ziad was a breeze. He is highly professional, responsive, and a truly talented developer.',
            rating: 5
        },
        {
            name: 'David Chen',
            role: 'Startup Founder',
            comment: 'The user interface Ziad created for our platform is beautiful and intuitive. Our users love it!',
            rating: 5
        }
    ];

    return (
        <div className="testimonials-page container section-padding">
            <div className="section-header">
                <span className="section-subtitle">Testimonials</span>
                <h2>What Clients Say</h2>
                <p>I take pride in delivering high-quality work that makes my clients happy.</p>
            </div>

            <div className="testimonials-grid">
                {reviews.map((review, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="testimonial-card glass"
                    >
                        <div className="review-stars">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                            ))}
                        </div>
                        <Quote className="quote-icon" size={32} />
                        <p className="review-comment">"{review.comment}"</p>
                        <div className="client-info">
                            <div className="client-avatar">
                                {review.name.charAt(0)}
                            </div>
                            <div className="client-details">
                                <h4>{review.name}</h4>
                                <span>{review.role}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
