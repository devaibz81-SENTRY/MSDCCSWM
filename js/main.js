// Main JavaScript for MSDCCSWM Logo Showcase

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.option-card').forEach(card => {
        observer.observe(card);
    });

    // Add parallax effect to floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Logo hover effect enhancement
    const oldLogo = document.querySelector('.old-logo');
    if (oldLogo) {
        oldLogo.addEventListener('mouseenter', () => {
            document.querySelector('.old-logo-wrapper').style.transform = 'scale(1.02)';
        });
        
        oldLogo.addEventListener('mouseleave', () => {
            document.querySelector('.old-logo-wrapper').style.transform = 'scale(1)';
        });
    }
});
