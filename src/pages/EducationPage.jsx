import PageTransition from '../components/PageTransition';
import EduTimeline from '../components/EduTimeline';
import Contact from '../components/Contact';
import { StarsCanvas, GradientOrbs } from '../components/canvas';

const EducationPage = () => {
    return (
        <PageTransition>
            <div className="relative min-h-screen bg-black">
                {/* Gradient Orbs Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <GradientOrbs />
                </div>

                {/* Stars Layer */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <StarsCanvas />
                </div>

                {/* Content */}
                <div className="relative z-10 pt-20">
                    <EduTimeline />
                    <Contact compact />
                </div>
            </div>
        </PageTransition>
    );
};

export default EducationPage;
