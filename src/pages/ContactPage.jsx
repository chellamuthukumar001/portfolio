import PageTransition from '../components/PageTransition';
import Contact from '../components/Contact';
import { EarthCanvas, GradientOrbs } from '../components/canvas';

const ContactPage = () => {
    return (
        <PageTransition>
            <div className="relative min-h-screen bg-black">
                {/* Gradient Orbs Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <GradientOrbs />
                </div>

                {/* Earth Layer */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <EarthCanvas />
                </div>

                {/* Content */}
                <div className="relative z-10 pt-20">
                    <Contact />
                </div>
            </div>
        </PageTransition>
    );
};

export default ContactPage;
