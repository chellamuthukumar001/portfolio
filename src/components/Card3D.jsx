import { motion } from 'framer-motion';

// Card3D — CSS-only 3D hover, no react-tilt JS overhead
const Card3D = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            className={`tilt-hover-card ${className}`}
            style={{ willChange: 'transform' }}
        >
            {children}
        </motion.div>
    );
};

export default Card3D;
