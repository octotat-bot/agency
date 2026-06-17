import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: 'BrixtinStudioX',
        role: 'Founder',
        company: 'TechStart',
        avatar: 'BX',
        image: null,
        content: '"Working with this team was a game-changer for our startup. They delivered a stunning website that perfectly captures our brand. The attention to detail is incredible."',
        rating: 5,
        highlight: 'game-changer'
    },
    {
        id: 2,
        name: 'BrixtinStudioX',
        role: 'Creative Director',
        company: 'Artify Studio',
        avatar: 'BX',
        image: null,
        content: '"I needed a portfolio that would stand out. They exceeded all expectations. The animations and interactions are simply beautiful and unique."',
        rating: 5,
        highlight: 'exceeded all expectations'
    },
    {
        id: 3,
        name: 'BrixtinStudioX',
        role: 'Owner',
        company: 'Local Bistro',
        avatar: 'BX',
        image: null,
        content: '"Professional website without breaking the bank. They helped increase our online reservations by 200%. Absolutely worth every penny."',
        rating: 5,
        highlight: 'increase of 200%'
    },
    {
        id: 4,
        name: 'BrixtinStudioX',
        role: 'CS Student',
        company: 'MIT',
        avatar: 'BX',
        image: null,
        content: '"My portfolio has helped me land multiple internship interviews at top tech companies. Best investment for my career."',
        rating: 5,
        highlight: 'multiple interviews'
    },
    {
        id: 5,
        name: 'BrixtinStudioX',
        role: 'CEO',
        company: 'GrowthLab',
        avatar: 'BX',
        image: null,
        content: '"They transformed our outdated website into a conversion machine. Professional, responsive, and truly understand business needs."',
        rating: 5,
        highlight: 'conversion machine'
    }
];

const Testimonials = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(1);

    // Auto-rotate
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleNext = () => {
        setIsAutoPlaying(false);
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <section className="testimonials section" ref={sectionRef} aria-label="Client testimonials">
            {/* Background Elements */}
            <div className="testimonials__bg">
                <div className="testimonials__gradient" />
                <div className="testimonials__grid" />
                <motion.div
                    className="testimonials__glow"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
            </div>

            <div className="container">
                {/* Header */}
                <motion.div
                    className="testimonials__header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Testimonials
                    </motion.span>
                    <h2 className="testimonials__title">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Trusted by <span className="text-serif">Amazing</span> Clients
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Main Testimonial Display */}
                <div className="testimonials__main">
                    {/* Left Side - Stats */}
                    <motion.div
                        className="testimonials__stats"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <div className="testimonials__stat">
                            <span className="testimonials__stat-number">50+</span>
                            <span className="testimonials__stat-label">Happy Clients</span>
                        </div>
                        <div className="testimonials__stat">
                            <span className="testimonials__stat-number">100%</span>
                            <span className="testimonials__stat-label">Satisfaction Rate</span>
                        </div>
                        <div className="testimonials__stat">
                            <span className="testimonials__stat-number">4.9</span>
                            <span className="testimonials__stat-label">Average Rating</span>
                            <div className="testimonials__stars">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Center - Main Card */}
                    <motion.div
                        className="testimonials__card-wrapper"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                className="testimonials__card"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                {/* Quote Icon */}
                                <div className="testimonials__quote-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                {/* Content */}
                                <p className="testimonials__content">
                                    {testimonials[activeIndex].content}
                                </p>

                                {/* Rating */}
                                <div className="testimonials__rating">
                                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                        <motion.svg
                                            key={i}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </motion.svg>
                                    ))}
                                </div>

                                {/* Author */}
                                <div className="testimonials__author">
                                    <div className="testimonials__avatar">
                                        {testimonials[activeIndex].avatar}
                                    </div>
                                    <div className="testimonials__author-info">
                                        <span className="testimonials__name">
                                            {testimonials[activeIndex].name}
                                        </span>
                                        <span className="testimonials__role">
                                            {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="testimonials__nav">
                            <motion.button
                                className="testimonials__nav-btn"
                                onClick={handlePrev}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Previous testimonial"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </motion.button>

                            <div className="testimonials__counter">
                                <span className="testimonials__counter-current">
                                    {String(activeIndex + 1).padStart(2, '0')}
                                </span>
                                <span className="testimonials__counter-divider">/</span>
                                <span className="testimonials__counter-total">
                                    {String(testimonials.length).padStart(2, '0')}
                                </span>
                            </div>

                            <motion.button
                                className="testimonials__nav-btn"
                                onClick={handleNext}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Next testimonial"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Side - Thumbnails */}
                    <motion.div
                        className="testimonials__thumbnails"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.button
                                key={testimonial.id}
                                className={`testimonials__thumbnail ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1);
                                    setIsAutoPlaying(false);
                                    setActiveIndex(index);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="testimonials__thumbnail-avatar">
                                    {testimonial.avatar}
                                </span>
                                <div className="testimonials__thumbnail-info">
                                    <span className="testimonials__thumbnail-name">
                                        {testimonial.name}
                                    </span>
                                    <span className="testimonials__thumbnail-company">
                                        {testimonial.company}
                                    </span>
                                </div>
                                {index === activeIndex && (
                                    <motion.div
                                        className="testimonials__thumbnail-indicator"
                                        layoutId="activeIndicator"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>

                {/* Progress Bar */}
                <motion.div
                    className="testimonials__progress"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`testimonials__progress-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => {
                                setDirection(index > activeIndex ? 1 : -1);
                                setIsAutoPlaying(false);
                                setActiveIndex(index);
                            }}
                            aria-label={`Go to testimonial ${index + 1} of ${testimonials.length}`}
                            aria-current={index === activeIndex ? 'true' : 'false'}
                        >
                            {index === activeIndex && (
                                <motion.div
                                    className="testimonials__progress-fill"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: isAutoPlaying ? 5 : 0.3, ease: 'linear' }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
