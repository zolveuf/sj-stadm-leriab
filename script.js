// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
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

// Contact Form Handling with Web3Forms
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('contact-submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('form-message');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        formMessage.style.display = 'none';
        
        try {
            const formData = new FormData(contactForm);
            
            // Add subject from select to formData
            const subjectSelect = document.getElementById('subject-select');
            if (subjectSelect && subjectSelect.value) {
                formData.set('subject', `Kontaktförfrågan: ${subjectSelect.value}`);
            }
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                formMessage.style.display = 'block';
                formMessage.style.background = '#d4edda';
                formMessage.style.border = '2px solid #28a745';
                formMessage.style.color = '#155724';
                formMessage.innerHTML = 'Tack för ditt meddelande! Vi kommer att kontakta dig snart.<br><small style="display: block; margin-top: 0.5rem; opacity: 0.8;">📱 Ett SMS-bekräftelse har skickats till ditt telefonnummer.</small>';
                contactForm.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                throw new Error(result.message || 'Något gick fel');
            }
        } catch (error) {
            formMessage.style.display = 'block';
            formMessage.style.background = '#f8d7da';
            formMessage.style.border = '2px solid #dc3545';
            formMessage.style.color = '#721c24';
            formMessage.textContent = 'Ett fel uppstod. Vänligen försök igen eller ring oss direkt på 073-527 19 57.';
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// Booking Form Handling with Web3Forms
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('booking-submit-btn');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;
        const formMessage = document.getElementById('booking-form-message');
        const formSuccess = document.getElementById('form-success');
        
        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline';
        }
        if (formMessage) formMessage.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'none';
        
        try {
            const formData = new FormData(bookingForm);
            
            // Add service to subject
            const serviceSelect = document.getElementById('booking-service');
            if (serviceSelect && serviceSelect.value) {
                formData.set('subject', `Bokningsförfrågan: ${serviceSelect.value}`);
            }
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    bookingForm.style.display = 'none';
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else if (formMessage) {
                    formMessage.style.display = 'block';
                    formMessage.style.background = '#d4edda';
                    formMessage.style.border = '2px solid #28a745';
                    formMessage.style.color = '#155724';
                    formMessage.innerHTML = 'Tack för din bokningsförfrågan! Vi har mottagit din förfrågan och kommer att kontakta dig inom 24 timmar.<br><small style="display: block; margin-top: 0.5rem; opacity: 0.8;">📱 Ett SMS-bekräftelse har skickats till ditt telefonnummer.</small>';
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                bookingForm.reset();
            } else {
                throw new Error(result.message || 'Något gick fel');
            }
        } catch (error) {
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.background = '#f8d7da';
                formMessage.style.border = '2px solid #dc3545';
                formMessage.style.color = '#721c24';
                formMessage.textContent = 'Ett fel uppstod. Vänligen försök igen eller ring oss direkt på 073-527 19 57.';
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
            }
        }
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

    // Enkla scroll-animationer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Lägg till animation på sektioner och kort
    document.querySelectorAll('.about-preview, .services-preview, .before-after, .social-media, .trust-signals, .cta, .process, .service-detailed-card, .project-item, .trust-item, .process-step, .booking-step, .benefit-item, .info-grid-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

