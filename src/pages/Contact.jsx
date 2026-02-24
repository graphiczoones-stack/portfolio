import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/ziads3dawy@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const contactInfo = [
        {
            icon: <Mail />,
            label: 'Email',
            value: 'ziads3dawy@gmail.com',
            link: 'mailto:ziads3dawy@gmail.com'
        },
        {
            icon: <Phone />,
            label: 'Phone',
            value: '01157166373',
            link: 'tel:01157166373'
        },
        {
            icon: <MessageCircle />,
            label: 'WhatsApp',
            value: 'Chat on WhatsApp',
            link: 'https://wa.me/201157166373'
        },
        {
            icon: <MapPin />,
            label: 'Location',
            value: 'Cairo, Egypt'
        }
    ];

    return (
        <div className="contact-page container section-padding">
            <div className="section-header">
                <span className="section-subtitle">Get in Touch</span>
                <h2>Let's Build Something Together</h2>
                <p>Feel free to reach out for collaborations, project inquiries, or just to say hi!</p>
            </div>

            <div className="contact-grid">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="contact-info-side"
                >
                    <h3>Let's Talk</h3>
                    <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>

                    <div className="contact-methods">
                        {contactInfo.map((info, idx) => (
                            <div key={idx} className="contact-method-item">
                                <div className="method-icon">{info.icon}</div>
                                <div>
                                    <span className="method-label">{info.label}</span>
                                    {info.link ? (
                                        <a href={info.link} className="method-value link">{info.value}</a>
                                    ) : (
                                        <p className="method-value">{info.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="contact-form-side glass"
                >
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label><User size={16} /> Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><AtSign size={16} /> Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><MessageSquare size={16} /> Message</label>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                        </button>

                        {submitStatus === 'success' && (
                            <p className="submit-success">Message sent successfully!</p>
                        )}
                        {submitStatus === 'error' && (
                            <p className="submit-error">Failed to send message. Please try again.</p>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
