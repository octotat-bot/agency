import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                {/* Top Section */}
                <div className="footer__top">
                    <motion.div
                        className="footer__cta"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="footer__cta-title">
                            Let's work <span className="text-serif">together</span>
                        </h2>
                        <p className="footer__cta-description">
                            Have a project in mind? We'd love to hear from you.
                        </p>
                    </motion.div>
                    <motion.a
                        href="#contact"
                        className="footer__cta-btn"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                        data-cursor="magnetic"
                    >
                        <span>Get in Touch</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </motion.a>
                </div>

                {/* Divider */}
                <div className="footer__divider" />

                {/* Main Content */}
                <div className="footer__content">
                    <motion.div
                        className="footer__brand"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/" className="footer__logo">BRIXTINSTUDIOX</Link>
                        <p className="footer__tagline">
                            A full-service creative agency crafting<br />
                            exceptional digital experiences.
                        </p>
                    </motion.div>

                    <motion.div
                        className="footer__links-group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4>Navigation</h4>
                        <nav className="footer__nav">
                            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('#services'); }} data-cursor="pointer">Services</a>
                            <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection('#work'); }} data-cursor="pointer">Work</a>
                            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }} data-cursor="pointer">About</a>
                            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }} data-cursor="pointer">Contact</a>
                        </nav>
                    </motion.div>

                    <motion.div
                        className="footer__links-group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <h4>Services</h4>
                        <nav className="footer__nav">
                            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('#services'); }}>Web Design</a>
                            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('#services'); }}>React Development</a>
                            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('#services'); }}>UI/UX Design</a>
                            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('#services'); }}>Portfolio Sites</a>
                        </nav>
                    </motion.div>

                    <motion.div
                        className="footer__links-group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4>Connect</h4>
                        <nav className="footer__nav">
                            <a href="#">Twitter / X</a>
                            <a href="#">GitHub</a>
                            <a href="#">LinkedIn</a>
                            <a href="#">Dribbble</a>
                        </nav>
                    </motion.div>
                </div>

                {/* Bottom */}
                <motion.div
                    className="footer__bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <p className="footer__copyright">
                        © {currentYear} BrixtinStudioX. All rights reserved.
                    </p>
                    <div className="footer__legal">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                    </div>
                    <p className="footer__credit">
                        Crafted by BrixtinStudioX
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
