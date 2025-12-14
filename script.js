// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        // For demo purposes, we'll just show an alert
        alert('Tack för ditt meddelande! Vi kommer att kontakta dig snart.');
        
        // Reset form
        contactForm.reset();
    });
}

// Loading Screen & Video Handling
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const heroVideo = document.getElementById('hero-video');
    const body = document.body;

    // Function to hide loading screen
    function hideLoadingScreen() {
        // Always remove loading class from body
        body.classList.remove('loading');
        
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove loading screen from DOM after animation
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // Only add loading class if loading screen exists
    if (loadingScreen) {
        body.classList.add('loading');

        // Check if video exists and handle loading
        if (heroVideo) {
            // Check if video has sources (if not, it means video hasn't been added yet)
            const hasVideoSources = heroVideo.querySelector('source') !== null;

            if (hasVideoSources) {
                // Wait for video to be ready
                heroVideo.addEventListener('loadeddata', () => {
                    heroVideo.classList.add('loaded');
                    hideLoadingScreen();
                });

                // Fallback: hide loading screen after max 5 seconds even if video doesn't load
                setTimeout(() => {
                    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                        heroVideo.classList.add('loaded');
                        hideLoadingScreen();
                    }
                }, 5000);

                // Handle video errors
                heroVideo.addEventListener('error', () => {
                    console.warn('Video failed to load, hiding loading screen');
                    hideLoadingScreen();
                });
            } else {
                // No video sources yet, hide loading screen immediately
                setTimeout(() => {
                    hideLoadingScreen();
                }, 1000);
            }
        } else {
            // No video element, hide loading screen after short delay
            setTimeout(() => {
                hideLoadingScreen();
            }, 1000);
        }
    } else {
        // No loading screen on this page, ensure body doesn't have loading class
        body.classList.remove('loading');
    }

    // Add scroll animations (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animations to elements
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .value-card, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

