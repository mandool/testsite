import React, { useEffect } from 'react';
import Scene from './components/Scene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
    useEffect(() => {
        gsap.from('.hero-content h1', {
            opacity: 0,
            y: 100,
            duration: 1.5,
            ease: 'power4.out',
        });

        gsap.from('.hero-content p', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            delay: 0.5,
            ease: 'power4.out',
        });

        gsap.to('.glass-card', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            duration: 1,
        });
    }, []);

    return (
        <main>
            <div className="content-wrapper">
                <section className="hero-section">
                    <Scene />
                    <div className="hero-content">
                        <h1>FUTURE<br />COLLECTIVE</h1>
                        <p>We push the boundaries of digital experiences through interactive 3D design and cutting-edge technology.</p>
                    </div>
                    <div className="scroll-indicator">
                        <span>Scroll to explore</span>
                    </div>
                </section>

                <section className="about-section">
                    <div className="glass-card" style={{ opacity: 0, transform: 'translateY(50px)' }}>
                        <h2>Innovation Redefined</h2>
                        <p>Our team specializes in creating immersive environments that tell a story. By blending art and engineering, we deliver unique perspectives that captivate audiences worldwide.</p>
                    </div>
                </section>

                <section className="services-section">
                    <div className="glass-card">
                        <h2>3D Identity</h2>
                        <p>Drag the model above to see our 3D vision in action. This is just a glimpse of what's possible when creativity meets interaction.</p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default App;
