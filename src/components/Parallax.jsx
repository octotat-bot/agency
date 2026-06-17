import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Parallax Wrapper - elements move at different speeds
const Parallax = ({
    children,
    speed = 0.5,
    direction = 'up',
    className = '',
    smoothness = { damping: 30, stiffness: 100 }
}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const getTransformRange = () => {
        const distance = 100 * speed;
        switch (direction) {
            case 'up':
                return [distance, -distance];
            case 'down':
                return [-distance, distance];
            case 'left':
                return [distance, -distance];
            case 'right':
                return [-distance, distance];
            default:
                return [distance, -distance];
        }
    };

    const range = getTransformRange();

    const isHorizontal = direction === 'left' || direction === 'right';
    const rawValue = useTransform(scrollYProgress, [0, 1], range);
    const smoothValue = useSpring(rawValue, smoothness);

    return (
        <motion.div
            ref={ref}
            className={`parallax ${className}`}
            style={{
                [isHorizontal ? 'x' : 'y']: smoothValue
            }}
        >
            {children}
        </motion.div>
    );
};

// Parallax Layer - for background/foreground effects
export const ParallaxLayer = ({
    children,
    depth = 1,  // 0 = fixed, 1 = normal, >1 = moves faster
    className = ''
}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [50 * depth, -50 * depth]);
    const smoothY = useSpring(y, { damping: 30, stiffness: 100 });

    return (
        <motion.div
            ref={ref}
            className={`parallax-layer ${className}`}
            style={{ y: smoothY }}
        >
            {children}
        </motion.div>
    );
};

// Parallax Image - images that shift on scroll
export const ParallaxImage = ({
    src,
    alt,
    speed = 0.3,
    className = ''
}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    const smoothY = useSpring(y, { damping: 30, stiffness: 100 });
    const smoothScale = useSpring(scale, { damping: 30, stiffness: 100 });

    return (
        <div ref={ref} className={`parallax-image-container ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                className="parallax-image"
                style={{
                    y: smoothY,
                    scale: smoothScale
                }}
            />
        </div>
    );
};

// Parallax Section - whole section with depth
export const ParallaxSection = ({
    children,
    className = '',
    overlayOpacity = 0
}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    return (
        <section ref={ref} className={`parallax-section ${className}`}>
            <motion.div
                className="parallax-section__content"
                style={{ opacity, scale, y }}
            >
                {children}
            </motion.div>
            {overlayOpacity > 0 && (
                <motion.div
                    className="parallax-section__overlay"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.5], [0, overlayOpacity])
                    }}
                />
            )}
        </section>
    );
};

// Scroll Reveal - elements appear on scroll
export const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = ''
}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center']
    });

    const getInitialPosition = () => {
        switch (direction) {
            case 'up': return { y: 50, x: 0 };
            case 'down': return { y: -50, x: 0 };
            case 'left': return { x: 50, y: 0 };
            case 'right': return { x: -50, y: 0 };
            default: return { y: 50, x: 0 };
        }
    };

    const initial = getInitialPosition();
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.3], [initial.y, 0]);
    const x = useTransform(scrollYProgress, [0, 0.3], [initial.x, 0]);

    return (
        <motion.div
            ref={ref}
            className={`scroll-reveal ${className}`}
            style={{ opacity, x, y }}
            transition={{ delay, duration }}
        >
            {children}
        </motion.div>
    );
};

export default Parallax;
