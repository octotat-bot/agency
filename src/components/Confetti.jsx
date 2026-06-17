import { useCallback, useRef } from 'react';

// Confetti Canvas Component
const Confetti = ({ trigger, duration = 3000 }) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    const colors = [
        '#8b2942', // burgundy
        '#c45c7a', // light burgundy
        '#ffd700', // gold
        '#ff6b6b', // coral
        '#4ecdc4', // teal
        '#ffffff', // white
        '#a855f7', // purple
    ];

    const createParticle = useCallback((x, y) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        return {
            x,
            y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 4 + Math.random() * 6,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            gravity: 0.15,
            friction: 0.99,
            opacity: 1,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        };
    }, []);

    const startConfetti = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create burst of particles from center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 3;

        particlesRef.current = [];
        for (let i = 0; i < 150; i++) {
            particlesRef.current.push(createParticle(centerX, centerY));
        }

        // Add side cannons
        for (let i = 0; i < 50; i++) {
            const leftParticle = createParticle(50, canvas.height);
            leftParticle.vx = Math.abs(leftParticle.vx) * 1.5;
            leftParticle.vy = -Math.abs(leftParticle.vy) * 2;
            particlesRef.current.push(leftParticle);

            const rightParticle = createParticle(canvas.width - 50, canvas.height);
            rightParticle.vx = -Math.abs(rightParticle.vx) * 1.5;
            rightParticle.vy = -Math.abs(rightParticle.vy) * 2;
            particlesRef.current.push(rightParticle);
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current = particlesRef.current.filter(p => {
                p.vy += p.gravity;
                p.vx *= p.friction;
                p.vy *= p.friction;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                p.opacity -= 0.005;

                if (p.opacity <= 0 || p.y > canvas.height + 50) return false;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;

                if (p.shape === 'rect') {
                    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
                return true;
            });

            if (particlesRef.current.length > 0) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animate();

        // Auto cleanup
        setTimeout(() => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            particlesRef.current = [];
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, duration);
    }, [createParticle, duration]);

    // Trigger confetti when prop changes
    if (trigger) {
        setTimeout(startConfetti, 100);
    }

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};

// Hook for easy confetti triggering
export const useConfetti = () => {
    const confettiRef = useRef(null);

    const fire = useCallback(() => {
        if (confettiRef.current) {
            confettiRef.current.start();
        }
    }, []);

    return { fire, confettiRef };
};

export default Confetti;
