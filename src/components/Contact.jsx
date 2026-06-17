import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useToast } from './Toast';
import Confetti from './Confetti';
import FileUpload from './FileUpload';
import './Contact.css';

// EmailJS Configuration - Replace with your own keys from emailjs.com
const EMAILJS_SERVICE_ID = 'service_brixtinstudiox'; // Get from EmailJS dashboard
const EMAILJS_TEMPLATE_ID = 'template_contact'; // Get from EmailJS dashboard  
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Get from EmailJS dashboard

const Contact = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const { showToast } = useToast();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [showConfetti, setShowConfetti] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        budget: '',
        message: ''
    });

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Please tell us about your project';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            // EmailJS integration
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                service: formData.service || 'Not specified',
                budget: formData.budget || 'Not specified',
                message: formData.message,
                to_name: 'BrixtinStudioX'
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            setIsSubmitted(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 100);
            showToast('Message sent successfully! We\'ll be in touch soon.', 'success');
            setFormData({
                name: '',
                email: '',
                service: '',
                budget: '',
                message: ''
            });
            setUploadedFiles([]);
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('Something went wrong. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const services = [
        { id: 'web', label: 'Web Design' },
        { id: 'react', label: 'React Dev' },
        { id: 'uiux', label: 'UI/UX' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'business', label: 'Business' },
        { id: 'saas', label: 'SaaS UI' }
    ];

    return (
        <section id="contact" className="contact section" ref={sectionRef}>
            {/* Confetti Celebration */}
            <Confetti trigger={showConfetti} />

            {/* Subtle Background */}
            <div className="contact__bg">
                <div className="contact__grid-pattern" />

                {/* Subtle Orbs - minimal animation */}
                <div className="contact__orb contact__orb--1" />
                <div className="contact__orb contact__orb--2" />
                <div className="contact__orb contact__orb--3" />
            </div>

            <div className="container contact__container">
                {/* Left Column - Header & Info */}
                <div className="contact__left">
                    <motion.div
                        className="contact__header"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="contact__badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="contact__badge-dot"></span>
                            Available for new projects
                        </motion.div>

                        <h2 className="contact__title">
                            <motion.span
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                Let's build
                            </motion.span>
                            <motion.span
                                className="text-serif"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                something
                            </motion.span>
                            <motion.span
                                className="text-gradient"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                iconic.
                            </motion.span>
                        </h2>

                        <motion.p
                            className="contact__description"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.6 }}
                        >
                            We help brands reinvent themselves through world-class design and engineering. Ready to start?
                        </motion.p>
                    </motion.div>

                    {/* Contact Info Grid */}
                    <motion.div
                        className="contact__info-grid"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7 }}
                    >
                        <a href="mailto:brixtonstudiox@gmail.com" className="contact__info-item">
                            <div className="contact__info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div>
                                <span className="contact__info-label">Email us</span>
                                <span className="contact__info-value">brixtonstudiox@gmail.com</span>
                            </div>
                        </a>

                        <div className="contact__info-item">
                            <div className="contact__info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div>
                                <span className="contact__info-label">Response Time</span>
                                <span className="contact__info-value">Within 24 Hours</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="contact__socials">
                        {['Twitter', 'Instagram', 'LinkedIn', 'Dribbble'].map((social, i) => (
                            <motion.a
                                key={social}
                                href="#"
                                className="contact__social-link"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                whileHover={{ y: -3, color: '#fff' }}
                            >
                                {social}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="contact__right">
                    <motion.div
                        className="contact__form-card"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form
                                    className="contact__form"
                                    onSubmit={handleSubmit}
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    {/* Progress Header */}
                                    <div className="contact__progress-header">
                                        <div className="contact__steps-count">
                                            <span className="current">0{activeStep}</span>
                                            <span className="separator">/</span>
                                            <span className="total">03</span>
                                        </div>
                                        <div className="contact__step-title">
                                            {activeStep === 1 && "The Basics"}
                                            {activeStep === 2 && "The Project"}
                                            {activeStep === 3 && "The Details"}
                                        </div>
                                    </div>

                                    {/* Step 1: Basic Info */}
                                    {activeStep === 1 && (
                                        <motion.div
                                            className="contact__step-content"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="contact__field">
                                                <label className="contact__label">What's your name?</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`contact__input ${errors.name ? 'error' : ''}`}
                                                    placeholder="John Doe"
                                                    autoFocus
                                                />
                                                {errors.name && <span className="contact__error">{errors.name}</span>}
                                            </div>
                                            <div className="contact__field">
                                                <label className="contact__label">And your email?</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`contact__input ${errors.email ? 'error' : ''}`}
                                                    placeholder="john@example.com"
                                                />
                                                {errors.email && <span className="contact__error">{errors.email}</span>}
                                            </div>

                                            <motion.button
                                                type="button"
                                                className="contact__btn-primary"
                                                onClick={() => setActiveStep(2)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Next Step
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                            </motion.button>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Service Selection */}
                                    {activeStep === 2 && (
                                        <motion.div
                                            className="contact__step-content"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="contact__field">
                                                <label className="contact__label">What do you need?</label>
                                                <div className="contact__service-grid">
                                                    {services.map((service, index) => (
                                                        <motion.button
                                                            key={service.id}
                                                            type="button"
                                                            className={`contact__service-card ${formData.service === service.label ? 'active' : ''}`}
                                                            onClick={() => setFormData({ ...formData, service: service.label })}
                                                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            {service.label}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="contact__nav-row">
                                                <button type="button" className="contact__btn-back" onClick={() => setActiveStep(1)}>Back</button>
                                                <motion.button
                                                    type="button"
                                                    className="contact__btn-primary"
                                                    onClick={() => setActiveStep(3)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Next Step
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Message */}
                                    {activeStep === 3 && (
                                        <motion.div
                                            className="contact__step-content"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="contact__field">
                                                <label className="contact__label">Tell us about your goals</label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className={`contact__textarea ${errors.message ? 'error' : ''}`}
                                                    placeholder="Project details, timeline, and other requirements..."
                                                />
                                                {errors.message && <span className="contact__error">{errors.message}</span>}
                                            </div>

                                            <div className="contact__field">
                                                <FileUpload
                                                    onFilesSelected={setUploadedFiles}
                                                    maxFiles={3}
                                                    maxSize={5}
                                                    acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.png']}
                                                    label="Attachments (optional)"
                                                />
                                            </div>

                                            <div className="contact__nav-row">
                                                <button type="button" className="contact__btn-back" onClick={() => setActiveStep(2)}>Back</button>
                                                <motion.button
                                                    type="submit"
                                                    className="contact__btn-submit"
                                                    disabled={isSubmitting}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.form>
                            ) : (
                                <motion.div
                                    className="contact__success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className="contact__success-icon">✨</div>
                                    <h3>Message Received!</h3>
                                    <p>We'll be in touch shortly to discuss your project.</p>
                                    <button onClick={() => { setIsSubmitted(false); setActiveStep(1); }} className="contact__btn-text">
                                        Send another message
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
