import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Send, MessageSquare, User, AtSign } from 'lucide-react';
import './Contact.css';

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
            icon: <Instagram />,
            label: 'Instagram',
            value: '@s3dawiy',
            link: 'https://www.instagram.com/s3dawiy/'
        },
        {
            icon: <WhatsAppIcon />,
            label: 'WhatsApp',
            value: 'Chat on WhatsApp',
            link: 'https://wa.me/201157166373'
        },
        {
            icon: <img src="/tiktok-48.ico" alt="TikTok" style={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }} />,
            label: 'TikTok',
            value: '@s3dawiy',
            link: 'https://www.tiktok.com/@s3dawiy'
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
