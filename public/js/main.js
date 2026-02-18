// Main JavaScript for MSDCCSWM Logo Showcase - Working V1

document.addEventListener('DOMContentLoaded', () => {
    
    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt="">';
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    
    // Lightbox functionality for all images
    document.querySelectorAll('img').forEach(img => {
        // Only add to mockup images and brand guide images
        if (img.closest('.mockup-card') || img.closest('.brand-guide') || img.classList.contains('hero-logo')) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Close lightbox
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close lightbox on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

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

    // Intersection Observer for scroll animations
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
    document.querySelectorAll('.option-card, .element-card, .mockup-card').forEach(card => {
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
    
    // Add hover sound effect (optional - commented out)
    // const hoverSound = new Audio('hover.mp3');
    
    // Add tilt effect to option cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================================
    // AUTO-PLAYING LOOPING LOGO ANIMATION
    // ============================================
    const canvas = document.getElementById('animationCanvas');
    const scrollSection = document.querySelector('.scroll-animation-section');
    
    if (canvas && scrollSection) {
        const ctx = canvas.getContext('2d');
        
        // Determine which animation folder to use based on page
        let animationFolder = '../logo animation/animation 1/';
        if (document.body.classList.contains('option-2')) {
            animationFolder = '../logo animation/animation 2/';
        } else if (document.body.classList.contains('option-3')) {
            animationFolder = '../logo animation/animation 3/';
        }
        
        // Animation settings
        let currentFrame = 0;
        let isPlaying = true;
        let lastFrameTime = 0;
        const fps = 30; // Frames per second - adjust for speed
        const frameDuration = 1000 / fps;
        
        // Preload all frames
        const totalFrames = 140;
        const frames = [];
        
        // Load first image to get dimensions
        const firstImg = new Image();
        firstImg.onload = () => {
            canvas.width = firstImg.width;
            canvas.height = firstImg.height;
            ctx.drawImage(firstImg, 0, 0);
            // Start animation once first frame is loaded
            requestAnimationFrame(animate);
        };
        firstImg.src = animationFolder + 'animation 1000.jpg';
        
        // Preload all frames
        for (let i = 0; i < totalFrames; i++) {
            const frameNum = 1000 + i;
            const img = new Image();
            img.src = animationFolder + 'animation ' + frameNum + '.jpg';
            frames.push(img);
        }
        
        // Animation loop
        function animate(timestamp) {
            if (!isPlaying) return;
            
            // Control frame rate
            if (timestamp - lastFrameTime >= frameDuration) {
                const frame = frames[currentFrame];
                
                if (frame && frame.complete) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(frame, 0, 0);
                }
                
                currentFrame++;
                
                // Loop back to start
                if (currentFrame >= totalFrames) {
                    currentFrame = 0;
                }
                
                lastFrameTime = timestamp;
            }
            
            // Keep looping
            requestAnimationFrame(animate);
        }
        
        // Optional: Pause on hover
        canvas.addEventListener('mouseenter', () => {
            isPlaying = false;
        });
        
        canvas.addEventListener('mouseleave', () => {
            isPlaying = true;
            lastFrameTime = performance.now();
            requestAnimationFrame(animate);
        });
    }
});
