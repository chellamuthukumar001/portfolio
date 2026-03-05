import PageTransition from '../components/PageTransition';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import { SkillOrbs } from '../components/canvas';

const SkillsPage = () => {
    return (
        <PageTransition>
            <div className="relative min-h-screen bg-black">
                {/* 3D Background */}
                <div className="absolute inset-0 z-0 opacity-60">
                    <SkillOrbs />
                </div>

                {/* Content */}
                <div className="relative z-10 pt-20">
                    <Skills />
                    <Contact compact />
                </div>
            </div>
        </PageTransition>
    );
};

export default SkillsPage;
