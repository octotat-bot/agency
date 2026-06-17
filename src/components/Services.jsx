import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';
import './Services.css';

// Custom Icon Components with burgundy accents
const WebIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#8b2942" strokeWidth="1.5" />
        <path d="M4 24h40" stroke="#8b2942" strokeWidth="1.5" />
        <path d="M7 14h34M7 34h34" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
);

const ReactIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon">
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="5" fill="#8b2942" />
    </svg>
);

const DesignIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon">
        <path d="M8 40L40 8" stroke="#8b2942" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M36 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        <rect x="6" y="6" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="4" fill="#8b2942" opacity="0.6" />
    </svg>
);

const PortfolioIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon">
        <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 18h36" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="14" r="1.5" fill="#8b2942" />
        <circle cx="17" cy="14" r="1.5" fill="#8b2942" opacity="0.7" />
        <circle cx="22" cy="14" r="1.5" fill="#8b2942" opacity="0.4" />
        <rect x="12" y="24" width="10" height="8" rx="1" fill="#8b2942" opacity="0.3" stroke="currentColor" strokeWidth="1" />
        <path d="M26 24h10M26 28h8M26 32h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const BusinessIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon">
        <path d="M6 42V18l18-12 18 12v24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="18" y="28" width="12" height="14" fill="#8b2942" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 28v14" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="20" width="6" height="6" stroke="#8b2942" strokeWidth="1.5" />
        <rect x="30" y="20" width="6" height="6" stroke="#8b2942" strokeWidth="1.5" />
    </svg>
);

const SaaSIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon">
        <rect x="6" y="8" width="36" height="26" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 28h36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M18 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="12" y="14" width="8" height="8" rx="1" fill="#8b2942" opacity="0.4" stroke="#8b2942" strokeWidth="1" />
        <path d="M24 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 18h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M24 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <circle cx="16" cy="32" r="2" fill="#8b2942" />
        <path d="M22 32h14" stroke="#8b2942" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const services = [
    {
        id: 1,
        number: '01',
        title: 'Web Design + Development',
        description: 'End-to-end web solutions that combine stunning visuals with robust functionality. We build websites that convert visitors into customers.',
        icon: <WebIcon />,
        features: ['Custom Design', 'Responsive', 'SEO Optimized', 'Fast Loading']
    },
    {
        id: 2,
        number: '02',
        title: 'React Frontend Development',
        description: 'Modern, scalable React applications with clean architecture. From SPAs to complex web apps, we bring your vision to life.',
        icon: <ReactIcon />,
        features: ['Component-Based', 'State Management', 'API Integration', 'Performance']
    },
    {
        id: 3,
        number: '03',
        title: 'UI/UX + Landing Pages',
        description: 'User-centered design that drives engagement. We create intuitive interfaces and high-converting landing pages.',
        icon: <DesignIcon />,
        features: ['User Research', 'Wireframing', 'Prototyping', 'A/B Testing']
    },
    {
        id: 4,
        number: '04',
        title: 'Portfolio Websites',
        description: 'Stand out from the crowd with a portfolio that showcases your work beautifully. Perfect for students and creative professionals.',
        icon: <PortfolioIcon />,
        features: ['Personal Branding', 'Case Studies', 'Interactive', 'Memorable']
    },
    {
        id: 5,
        number: '05',
        title: 'Business Websites',
        description: 'Professional online presence for local brands and businesses. We help you connect with your community and grow.',
        icon: <BusinessIcon />,
        features: ['Brand Identity', 'Contact Forms', 'Maps Integration', 'Analytics']
    },
    {
        id: 6,
        number: '06',
        title: 'Resume / SaaS UI',
        description: 'Clean, functional interfaces for SaaS products and professional resumes that make a lasting impression.',
        icon: <SaaSIcon />,
        features: ['Dashboard Design', 'Data Visualization', 'User Flows', 'Onboarding']
    }
];

const ServiceCard = ({ service, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: '-50px' });
    const [isHovered, setIsHovered] = useState(false);

    // Alternating slide directions based on index
    const slideDirection = index % 2 === 0 ? -100 : 100;
    const rotateDirection = index % 2 === 0 ? -5 : 5;

    return (
        <motion.div
            ref={cardRef}
            className={`service-card ${isHovered ? 'service-card--hovered' : ''}`}
            initial={{
                opacity: 0,
                x: slideDirection,
                rotate: rotateDirection
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                rotate: 0
            } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -10 }}
        >
            {/* Card Content - Always Visible */}
            <div className="service-card__front">
                <motion.span
                    className="service-card__number"
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                        opacity: isHovered ? 0.8 : 0.3
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {service.number}
                </motion.span>
                <motion.div
                    className="service-card__icon"
                    animate={{
                        scale: isHovered ? 1.3 : 1,
                        rotate: isHovered ? 360 : 0
                    }}
                    transition={{ duration: 0.6 }}
                >
                    {service.icon}
                </motion.div>
                <h3 className="service-card__title">{service.title}</h3>
                <motion.div
                    className="service-card__indicator"
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <span>Hover to explore</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </motion.div>
            </div>

            {/* Card Details - Shown on Hover */}
            <motion.div
                className="service-card__back"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <span className="service-card__number">{service.number}</span>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <motion.div
                    className="service-card__features"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.05
                            }
                        }
                    }}
                    initial="hidden"
                    animate={isHovered ? "visible" : "hidden"}
                >
                    {service.features.map((feature, i) => (
                        <motion.span
                            key={i}
                            className="service-card__feature"
                            variants={{
                                hidden: { opacity: 0, x: -20, scale: 0.8 },
                                visible: { opacity: 1, x: 0, scale: 1 }
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {feature}
                        </motion.span>
                    ))}
                </motion.div>
                <div className="service-card__cta">
                    <span>Learn More</span>
                    <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                        transition={{ repeat: isHovered ? Infinity : 0, duration: 1 }}
                    >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </motion.svg>
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
                className="service-card__corner service-card__corner--tl"
                animate={{ scale: isHovered ? 1.5 : 1 }}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                className="service-card__corner service-card__corner--tr"
                animate={{ scale: isHovered ? 1.5 : 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            />
            <motion.div
                className="service-card__corner service-card__corner--bl"
                animate={{ scale: isHovered ? 1.5 : 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            />
            <motion.div
                className="service-card__corner service-card__corner--br"
                animate={{ scale: isHovered ? 1.5 : 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
            />

            {/* Card Glow */}
            <motion.div
                className="service-card__glow"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

const Services = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="services" className="services section" ref={sectionRef}>
            {/* Animated Background */}
            <div className="services__bg-pattern">
                <div className="services__grid-lines" />

                {/* Floating Elements */}
                <motion.div
                    className="services__floating services__floating--1"
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 15, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
                <motion.div
                    className="services__floating services__floating--2"
                    animate={{
                        x: [0, 20, 0],
                        y: [0, -15, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                />
                <motion.div
                    className="services__floating services__floating--3"
                    animate={{
                        rotate: [0, 360]
                    }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                />
            </div>

            <div className="container">
                {/* Section Header */}
                <div className="services__header">
                    <motion.div
                        className="services__header-content"
                        initial={{ opacity: 0, x: -80 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <motion.span
                            className="section-label"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            What We Do
                        </motion.span>
                        <h2 className="heading-lg">
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                style={{ display: 'block' }}
                            >
                                <GlitchText text="Services That" />
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                style={{ display: 'block' }}
                            >
                                <span className="text-serif">Elevate</span> Your Brand
                            </motion.span>
                        </h2>

                        {/* Animated Line */}
                        <motion.div
                            className="services__header-line"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.6, duration: 1 }}
                        />
                    </motion.div>
                    <motion.p
                        className="services__header-text"
                        initial={{ opacity: 0, x: 80 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        From concept to launch, we provide comprehensive digital solutions
                        tailored to your unique needs. Each project is crafted with precision
                        and passion to deliver exceptional results.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="services__grid">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="services__cta"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        Have a project in mind?
                    </motion.p>
                    <motion.a
                        href="#contact"
                        className="services__cta-link"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        whileHover={{ scale: 1.05, gap: '20px' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Let's talk</span>
                        <motion.svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </motion.svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
