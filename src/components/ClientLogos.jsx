import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ClientLogos.css';

const ClientLogos = () => {
    // Ideally use SVGs here. For now using text logos with a premium look.
    const clients = [
        { id: 1, name: 'BRIXTINSTUDIOX' },
        { id: 2, name: 'BRIXTINSTUDIOX' },
        { id: 3, name: 'BRIXTINSTUDIOX' },
        { id: 4, name: 'BRIXTINSTUDIOX' },
        { id: 5, name: 'BRIXTINSTUDIOX' },
        { id: 6, name: 'BRIXTINSTUDIOX' },
        { id: 7, name: 'BRIXTINSTUDIOX' },
        { id: 8, name: 'BRIXTINSTUDIOX' },
        { id: 9, name: 'BRIXTINSTUDIOX' },
        { id: 10, name: 'BRIXTINSTUDIOX' }
    ];

    // Triple the array for seamless infinite scroll
    const clientList = [...clients, ...clients, ...clients];

    return (
        <section className="client-logos">
            <div className="client-logos__container">
                <motion.p
                    className="client-logos__label"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Trusted by innovative teams worldwide
                </motion.p>

                <div className="client-logos__slider-container">
                    <motion.div
                        className="client-logos__track"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 40,
                            ease: "linear"
                        }}
                    >
                        {clientList.map((client, index) => (
                            <div key={`${client.id}-${index}`} className="client-logos__item">
                                <span className="client-logos__text">{client.name}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Fade gradients for smooth edges */}
                    <div className="client-logos__fade client-logos__fade--left" />
                    <div className="client-logos__fade client-logos__fade--right" />
                </div>
            </div>
        </section>
    );
};

export default ClientLogos;
