import PageTransition from '../components/PageTransition';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import { ParticleField, GradientOrbs } from '../components/canvas';

const ProjectsPage = () => {
    return (
        <PageTransition>
            <div className="relative min-h-screen bg-black">
                {/* Gradient Orbs Background */}
                <div className="absolute inset-0 z-0 opacity-50">
                    <GradientOrbs />
                </div>

                {/* Particle Field Layer */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <ParticleField />
                </div>

                {/* Content */}
                <div className="relative z-10 pt-20">
                    <Projects />
                    <Contact compact />
                </div>
            </div>
        </PageTransition>
    );
};

export default ProjectsPage;
