import PageTransition from '../components/PageTransition';
import About from '../components/About';
import Contact from '../components/Contact';
import { FloatingElements, GradientOrbs } from '../components/canvas';

const AboutPage = () => {
    return (
        <PageTransition>
            <div className="relative min-h-screen bg-black">
                {/* Gradient Orbs Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <GradientOrbs />
                </div>

                {/* Floating Elements Layer */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <FloatingElements />
                </div>

                {/* Content */}
                <div className="relative z-10 pt-20">
                    <About />
                    <Contact compact />
                </div>
            </div>
        </PageTransition>
    );
};

export default AboutPage;
