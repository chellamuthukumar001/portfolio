import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

const Card3D = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay }}
        >
            <Tilt
                options={{
                    max: 15,
                    scale: 1.05,
                    speed: 450,
                    glare: true,
                    'max-glare': 0.3,
                }}
                className={`tilt-card ${className}`}
            >
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                    {children}
                </div>
            </Tilt>
        </motion.div>
    );
};

export default Card3D;
