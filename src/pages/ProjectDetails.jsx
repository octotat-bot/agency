import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from '../components/Footer';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Mock data - in a real app, fetch based on ID
    const project = {
        title: 'Fintech Dashboard',
        category: 'SaaS UI / UX Design',
        client: 'FinTech Corp',
        year: '2024',
        description: 'A comprehensive financial management dashboard designed to simplify complex data visualization for enterprise users. We focused on clarity, performance, and real-time data updates.',
        challenge: 'The main challenge was to organize a massive amount of financial data into an intuitive interface without overwhelming the user. Performance was also critical as the dashboard handles real-time stock updates.',
        solution: 'We adopted a modular component architecture and a dark-themed UI to reduce eye strain. We used advanced charting libraries optimized for WebGL to ensure smooth rendering of millions of data points.',
        images: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80'
        ],
        stack: ['React', 'TypeScript', 'D3.js', 'Node.js']
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="project-details"
        >
            <motion.div className="progress-bar" style={{ scaleX }} />

            {/* Hero Header */}
            <section className="project-hero">
                <div className="container">
                    <Link to="/" className="back-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="project-header-content"
                    >
                        <span className="project-category">{project.category}</span>
                        <h1 className="project-title">{project.title}</h1>

                        <div className="project-meta">
                            <div className="meta-item">
                                <span className="meta-label">Client</span>
                                <span className="meta-value">{project.client}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Year</span>
                                <span className="meta-value">{project.year}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Services</span>
                                <span className="meta-value">UI/UX, Frontend</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Image */}
            <section className="project-hero-image">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="container"
                >
                    <img src={project.images[0]} alt={project.title} />
                </motion.div>
            </section>

            {/* Content */}
            <section className="project-content section">
                <div className="container">
                    <div className="content-grid">
                        <div className="content-sidebar">
                            <h3>Tech Stack</h3>
                            <ul className="stack-list">
                                {project.stack.map(tech => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="content-main">
                            <div className="text-block">
                                <h2>The Challenge</h2>
                                <p>{project.challenge}</p>
                            </div>

                            <div className="text-block">
                                <h2>The Solution</h2>
                                <p>{project.solution}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="project-gallery section">
                <div className="container">
                    <div className="gallery-grid">
                        {project.images.slice(1).map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="gallery-item"
                            >
                                <img src={img} alt={`Project Detail ${index + 1}`} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Next Project CTA */}
            <section className="next-project">
                <div className="container">
                    <div className="next-project-content">
                        <span>Next Project</span>
                        <h2>E-Commerce Platform</h2>
                        <Link to="/project/2" className="btn btn-outline">View Case Study</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </motion.div>
    );
};

export default ProjectDetails;
