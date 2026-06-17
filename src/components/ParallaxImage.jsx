import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({ src, alt, className = "", containerClassName = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <div
            ref={ref}
            className={`parallax-container ${containerClassName}`}
            style={{ overflow: 'hidden', position: 'relative' }}
        >
            <motion.img
                src={src}
                alt={alt}
                className={className}
                style={{ y, scale, width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
};

export default ParallaxImage;
