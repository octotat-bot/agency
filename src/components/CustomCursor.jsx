import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorVariant, setCursorVariant] = useState('default');
    const [cursorText, setCursorText] = useState('');

    // Start cursor off-screen
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring for smooth following
    const springConfig = { damping: 25, stiffness: 400, mass: 0.3 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Slower spring for ring (trailing effect)
    const ringConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const ringXSpring = useSpring(cursorX, ringConfig);
    const ringYSpring = useSpring(cursorY, ringConfig);

    const handleMouseMove = useCallback((e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        // Always show cursor when mouse moves inside the window
        if (!isVisible) setIsVisible(true);
    }, [cursorX, cursorY, isVisible]);

    useEffect(() => {
        // Check if touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        let hideTimeout;

        const handleMouseEnter = () => {
            clearTimeout(hideTimeout);
            setIsVisible(true);
        };

        const handleMouseLeave = (e) => {
            // Only hide if mouse actually left the viewport
            const isOutsideViewport =
                e.clientX <= 0 ||
                e.clientY <= 0 ||
                e.clientX >= window.innerWidth ||
                e.clientY >= window.innerHeight;

            if (isOutsideViewport) {
                // Delay hiding to prevent flicker
                hideTimeout = setTimeout(() => setIsVisible(false), 100);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Force show cursor when window gains focus
        const handleFocus = () => setIsVisible(true);
        const handleBlur = () => {
            hideTimeout = setTimeout(() => setIsVisible(false), 200);
        };

        const addHoverListeners = () => {
            // Links and buttons
            document.querySelectorAll('a, button, [data-cursor="pointer"]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    setIsHovering(true);
                    setCursorVariant('hover');
                });
                el.addEventListener('mouseleave', () => {
                    setIsHovering(false);
                    setCursorVariant('default');
                    setCursorText('');
                });
            });

            // Magnetic buttons
            document.querySelectorAll('[data-cursor="magnetic"]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    setIsHovering(true);
                    setCursorVariant('magnetic');
                });
                el.addEventListener('mouseleave', () => {
                    setIsHovering(false);
                    setCursorVariant('default');
                    el.style.transform = '';
                });
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const deltaX = (e.clientX - centerX) * 0.2;
                    const deltaY = (e.clientY - centerY) * 0.2;
                    el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                });
            });

            // View cursor
            document.querySelectorAll('[data-cursor="view"]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    setIsHovering(true);
                    setCursorVariant('view');
                    setCursorText('View');
                });
                el.addEventListener('mouseleave', () => {
                    setIsHovering(false);
                    setCursorVariant('default');
                    setCursorText('');
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        // Initial setup
        addHoverListeners();

        // Re-add on DOM changes (debounced)
        let debounceTimer;
        const observer = new MutationObserver(() => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(addHoverListeners, 100);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearTimeout(hideTimeout);
            clearTimeout(debounceTimer);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            observer.disconnect();
        };
    }, [handleMouseMove]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    const getScale = () => {
        if (cursorVariant === 'view') return { dot: 0, ring: 3 };
        if (cursorVariant === 'magnetic') return { dot: 0.5, ring: 1.5 };
        if (isHovering) return { dot: 1.5, ring: 1.5 };
        return { dot: 1, ring: 1 };
    };

    const scale = getScale();

    return (
        <>
            {/* Dot */}
            <motion.div
                className={`cursor ${isClicking ? 'cursor--clicking' : ''}`}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                animate={{
                    scale: isClicking ? 0.8 : scale.dot,
                    opacity: isVisible && scale.dot > 0 ? 1 : 0,
                }}
            />

            {/* Ring */}
            <motion.div
                className={`cursor-ring cursor-ring--${cursorVariant}`}
                style={{
                    x: ringXSpring,
                    y: ringYSpring,
                }}
                animate={{
                    scale: isClicking ? 0.9 : scale.ring,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                {cursorText && (
                    <span className="cursor-text">{cursorText}</span>
                )}
            </motion.div>
        </>
    );
};

export default CustomCursor;
