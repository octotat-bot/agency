import { motion } from 'framer-motion';
import './Skeleton.css';

// Base Skeleton Component
const Skeleton = ({
    variant = 'text',
    width,
    height,
    borderRadius,
    className = '',
    animation = true
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'title':
                return { width: width || '60%', height: height || '2em' };
            case 'text':
                return { width: width || '100%', height: height || '1em' };
            case 'avatar':
                return {
                    width: width || '60px',
                    height: height || '60px',
                    borderRadius: borderRadius || '50%'
                };
            case 'image':
                return {
                    width: width || '100%',
                    height: height || '200px',
                    borderRadius: borderRadius || '12px'
                };
            case 'card':
                return {
                    width: width || '100%',
                    height: height || '300px',
                    borderRadius: borderRadius || '16px'
                };
            case 'button':
                return {
                    width: width || '120px',
                    height: height || '44px',
                    borderRadius: borderRadius || '22px'
                };
            case 'circle':
                return {
                    width: width || '40px',
                    height: height || '40px',
                    borderRadius: '50%'
                };
            default:
                return { width, height, borderRadius };
        }
    };

    return (
        <motion.div
            className={`skeleton skeleton--${variant} ${className} ${animation ? '' : 'skeleton--no-animation'}`}
            style={getVariantStyles()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        />
    );
};

// Skeleton Text Lines
export const SkeletonLines = ({ lines = 3, widths = [] }) => {
    const defaultWidths = ['100%', '90%', '75%', '80%', '60%'];

    return (
        <div className="skeleton-lines">
            {[...Array(lines)].map((_, i) => (
                <Skeleton
                    key={i}
                    variant="text"
                    width={widths[i] || defaultWidths[i % defaultWidths.length]}
                />
            ))}
        </div>
    );
};

// Skeleton Card
export const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <Skeleton variant="image" height="180px" />
            <div className="skeleton-card__content">
                <Skeleton variant="title" width="70%" />
                <SkeletonLines lines={2} />
            </div>
        </div>
    );
};

// Skeleton Service Card
export const SkeletonServiceCard = () => {
    return (
        <div className="skeleton-service-card">
            <div className="skeleton-service-card__header">
                <Skeleton variant="circle" width="50px" height="50px" />
                <Skeleton variant="text" width="60px" />
            </div>
            <Skeleton variant="title" width="80%" />
            <SkeletonLines lines={3} />
            <div className="skeleton-service-card__tags">
                <Skeleton variant="button" width="80px" height="28px" />
                <Skeleton variant="button" width="100px" height="28px" />
                <Skeleton variant="button" width="70px" height="28px" />
            </div>
        </div>
    );
};

// Skeleton Testimonial
export const SkeletonTestimonial = () => {
    return (
        <div className="skeleton-testimonial">
            <SkeletonLines lines={4} />
            <div className="skeleton-testimonial__author">
                <Skeleton variant="avatar" width="50px" height="50px" />
                <div className="skeleton-testimonial__info">
                    <Skeleton variant="text" width="120px" />
                    <Skeleton variant="text" width="80px" />
                </div>
            </div>
        </div>
    );
};

// Skeleton Project
export const SkeletonProject = () => {
    return (
        <div className="skeleton-project">
            <Skeleton variant="image" height="400px" borderRadius="16px" />
            <div className="skeleton-project__info">
                <Skeleton variant="title" width="50%" />
                <Skeleton variant="text" width="30%" />
            </div>
        </div>
    );
};

// Skeleton Pricing Card
export const SkeletonPricing = () => {
    return (
        <div className="skeleton-pricing">
            <Skeleton variant="title" width="60%" />
            <Skeleton variant="text" width="80%" />
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <Skeleton variant="circle" width="24px" height="24px" />
                <Skeleton variant="title" width="120px" height="48px" />
            </div>
            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Skeleton variant="circle" width="18px" height="18px" />
                        <Skeleton variant="text" width={`${70 + Math.random() * 20}%`} />
                    </div>
                ))}
            </div>
            <Skeleton variant="button" width="100%" height="50px" style={{ marginTop: '30px' }} />
        </div>
    );
};

export default Skeleton;
