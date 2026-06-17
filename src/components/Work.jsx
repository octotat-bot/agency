import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxImage from './ParallaxImage';
import MagneticButton from './MagneticButton';
import './Work.css';

const projects = [
    {
        id: 1,
        title: 'Fintech Dashboard',
        category: 'SaaS UI',
        year: '2024',
        description: 'A comprehensive financial management dashboard with real-time analytics and intuitive user experience.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
        tags: ['React', 'Dashboard', 'Analytics'],
        color: '#8b2942'
    },
    {
        id: 2,
        title: 'E-Commerce Platform',
        category: 'Web Development',
        year: '2024',
        description: 'Modern e-commerce experience with seamless checkout flow and personalized recommendations.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
        tags: ['Next.js', 'E-Commerce', 'UI/UX'],
        color: '#4a1c2e'
    },
    {
        id: 3,
        title: 'Creative Portfolio',
        category: 'Portfolio',
        year: '2023',
        description: 'Stunning portfolio website for a creative director showcasing award-winning campaigns.',
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&auto=format&fit=crop&q=80',
        tags: ['Portfolio', 'Animation', 'Branding'],
        color: '#2d1a24'
    },
    {
        id: 4,
        title: 'Restaurant Website',
        category: 'Business Website',
        year: '2023',
        description: 'Elegant online presence for a Michelin-starred restaurant with reservation system.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80',
        tags: ['Restaurant', 'Booking', 'Local Business'],
        color: '#3d1f2e'
    },
    {
        id: 5,
        title: 'Fitness App UI',
        category: 'Mobile Design',
        year: '2024',
        description: 'Dynamic fitness tracking application with personalized workout plans and progress analytics.',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&auto=format&fit=crop&q=80',
        tags: ['Mobile', 'Fitness', 'UI Design'],
        color: '#5a2d3d'
    }
];

const Work = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);

    const totalProjects = projects.length;

    // Auto-rotate carousel
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalProjects);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalProjects]);

    // Handle navigation
    const goToNext = () => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev + 1) % totalProjects);
    };

    const goToPrev = () => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    };

    const goToSlide = (index) => {
        setIsAutoPlaying(false);
        setActiveIndex(index);
    };

    // Handle drag
    const handleDragStart = (e) => {
        setIsDragging(true);
        setIsAutoPlaying(false);
        setDragStart(e.clientX || e.touches?.[0]?.clientX || 0);
    };

    const handleDragEnd = (e) => {
        if (!isDragging) return;
        setIsDragging(false);
        const dragEnd = e.clientX || e.changedTouches?.[0]?.clientX || 0;
        const diff = dragStart - dragEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
    };

    // Calculate card position and styles
    const getCardStyle = (index) => {
        const diff = index - activeIndex;
        const normalizedDiff = ((diff + totalProjects + Math.floor(totalProjects / 2)) % totalProjects) - Math.floor(totalProjects / 2);

        const absNormDiff = Math.abs(normalizedDiff);
        const isActive = normalizedDiff === 0;
        const isAdjacent = absNormDiff === 1;
        const isSecondary = absNormDiff === 2;

        let translateX = normalizedDiff * 320;
        let translateZ = isActive ? 0 : isAdjacent ? -150 : -300;
        let rotateY = normalizedDiff * -25;
        let scale = isActive ? 1 : isAdjacent ? 0.85 : 0.7;
        let opacity = isActive ? 1 : isAdjacent ? 0.7 : isSecondary ? 0.4 : 0;
        let zIndex = isActive ? 10 : isAdjacent ? 5 : 1;

        return {
            transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            opacity,
            zIndex,
            filter: isActive ? 'none' : `blur(${absNormDiff * 2}px)`,
        };
    };

    const activeProject = projects[activeIndex];

    return (
        <section id="work" className="work section" ref={sectionRef}>
            {/* Animated Background */}
            <div className="work__bg">
                <div className="work__bg-gradient" />
                <div className="work__bg-grid" />
                {/* Dynamic background based on active project */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        className="work__bg-image"
                        style={{ backgroundImage: `url(${activeProject.image})` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    />
                </AnimatePresence>
            </div>

            <div className="container">
                {/* Section Header */}
                <div className="work__header">
                    <motion.div
                        className="work__header-top"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label">Selected Work</span>
                        <h2 className="heading-lg">
                            Featured<br />
                            <span className="text-serif">Projects</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        className="work__header-stats"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="work__stat">
                            <span className="work__stat-number">50+</span>
                            <span className="work__stat-label">Projects Completed</span>
                        </div>
                        <div className="work__stat">
                            <span className="work__stat-number">100%</span>
                            <span className="work__stat-label">Client Satisfaction</span>
                        </div>
                    </motion.div>
                </div>

                {/* 3D Carousel */}
                <motion.div
                    className="work__carousel"
                    initial={{ opacity: 0, y: 80 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchEnd={handleDragEnd}
                >
                    <div className="work__carousel-track">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className={`work__card ${index === activeIndex ? 'work__card--active' : ''}`}
                                style={getCardStyle(index)}
                                onClick={() => goToSlide(index)}
                                animate={getCardStyle(index)}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <div className="work__card-inner">
                                    {/* Card Image */}
                                    <div className="work__card-image-wrapper">
                                        <ParallaxImage
                                            src={project.image}
                                            alt={project.title}
                                            className="work__card-image-img"
                                        />
                                        <div className="work__card-overlay" />

                                        {/* Number Badge */}
                                        <div className="work__card-number">
                                            0{index + 1}
                                        </div>

                                        {/* View Button */}
                                        {index === activeIndex && (
                                            <Link to={`/project/${project.id}`} className="work__card-view">
                                                <span>View</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                                </svg>
                                            </Link>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="work__card-content">
                                        <div className="work__card-meta">
                                            <span className="work__card-category">{project.category}</span>
                                            <span className="work__card-year">{project.year}</span>
                                        </div>
                                        <h3 className="work__card-title">{project.title}</h3>
                                    </div>

                                    {/* Glow Effect */}
                                    <div className="work__card-glow" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button className="work__nav work__nav--prev" onClick={goToPrev}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="work__nav work__nav--next" onClick={goToNext}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </motion.div>

                {/* Active Project Details */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        className="work__details"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="work__details-description">{activeProject.description}</p>
                        <div className="work__details-tags">
                            {activeProject.tags.map((tag, i) => (
                                <span key={i} className="work__details-tag">{tag}</span>
                            ))}
                        </div>
                        <Link to={`/project/${activeProject.id}`} className="work__details-link">
                            <span>Explore Project</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </Link>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Indicators */}
                <div className="work__indicators">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`work__indicator ${index === activeIndex ? 'work__indicator--active' : ''}`}
                            onClick={() => goToSlide(index)}
                        >
                            <span className="work__indicator-progress"
                                style={{
                                    animationDuration: index === activeIndex && isAutoPlaying ? '4s' : '0s',
                                    animationPlayState: index === activeIndex && isAutoPlaying ? 'running' : 'paused'
                                }}
                            />
                        </button>
                    ))}
                    <span className="work__indicator-count">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                    </span>
                </div>

                {/* Footer CTA */}
                <motion.div
                    className="work__footer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="work__footer-line" />
                    <MagneticButton className="work__footer-btn">
                        <motion.a
                            href="#contact"
                            className="work__footer-link"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span>Start Your Project</span>
                            <div className="work__footer-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </div>
                        </motion.a>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
};

export default Work;
