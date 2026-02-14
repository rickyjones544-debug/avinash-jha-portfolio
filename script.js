// Modern Portfolio JavaScript - International Standards
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initInteractions();
    initForms();
});

// Theme Toggle
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'dark';
    }
    
    themeSwitch.addEventListener('change', () => {
        const theme = themeSwitch.checked ? 'dark' : 'light';
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling and active link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero elements
    const heroVisual = document.querySelector('.hero-visual');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate * 0.3}px)`;
        }
    });
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.hero-badge, .hero-intro, .hero-description, .hero-stats, .hero-actions, .hero-social');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
}

// Animations
function initAnimations() {
    // Floating animation for tech cards
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
    
    // Profile image hover effect
    const profileImg = document.querySelector('.profile-img');
    const floatingCards = document.querySelectorAll('.tech-card');
    
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            floatingCards.forEach(card => {
                card.style.animationPlayState = 'paused';
            });
        });
        
        profileImg.addEventListener('mouseleave', () => {
            floatingCards.forEach(card => {
                card.style.animationPlayState = 'running';
            });
        });
    }
}

// Interactions
function initInteractions() {
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.innerHTML = text.slice(0, index + 1);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                let current = 0;
                const increment = number / 50;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < number) {
                        target.textContent = Math.floor(current) + text.replace(/\d+/, '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = text;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Forms
function initForms() {
    // Enhanced contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Create mailto link
            const mailtoLink = `mailto:avij889@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;
            
            window.location.href = mailtoLink;
            showNotification('Opening your email client...', 'success');
            this.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            this.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 1002;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-family: var(--font-sans);
    `;

    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, var(--success), #059669)',
        error: 'linear-gradient(135deg, var(--error), #dc2626)',
        info: 'linear-gradient(135deg, var(--info), #1d4ed8)',
        warning: 'linear-gradient(135deg, var(--warning), #d97706)'
    };
    
    notification.style.background = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const optimizedScroll = debounce(() => {
    // Scroll-based animations
}, 16); // 60fps

window.addEventListener('scroll', optimizedScroll);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // DOM is ready
    });
} else {
    // DOM is already ready
}

// Export for potential use in other modules
window.Portfolio = {
    showNotification,
    debounce
};

// Active Navigation Highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Enhanced Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        subject: document.getElementById('subject').value,
        budget: document.getElementById('budget').value,
        timeline: document.getElementById('timeline').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked
    };

    // Clear previous errors
    clearValidationErrors();

    // Validate form
    const validationErrors = validateContactForm(formData);
    
    if (validationErrors.length > 0) {
        showValidationErrors(validationErrors);
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        // Success - show success message
        const formContainer = document.querySelector('.contact-form-container');
        const form = document.querySelector('.contact-form');
        const successMessage = document.querySelector('.form-success');
        
        form.style.display = 'none';
        successMessage.style.display = 'flex';
        
        // Reset form
        this.reset();
        
        // Show notification
        showNotification('Message sent successfully! I\'ll get back to you within 2 hours.', 'success');
        
        // Scroll to success message
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    }, 2000);
});

// Form Validation Functions
function validateContactForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (data.phone && data.phone.trim()) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
        }
    }
    
    // Subject validation
    if (!data.subject || data.subject === '') {
        errors.push({ field: 'subject', message: 'Please select a subject' });
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
    }
    
    return errors;
}

function showValidationErrors(errors) {
    errors.forEach(error => {
        const input = document.getElementById(error.field);
        const errorElement = input.parentElement.querySelector('.input-error');
        
        input.classList.add('error');
        errorElement.textContent = error.message;
        errorElement.classList.add('show');
    });
    
    // Focus on first error
    if (errors.length > 0) {
        document.getElementById(errors[0].field).focus();
    }
}

function clearValidationErrors() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.classList.remove('error');
        const errorElement = input.parentElement.querySelector('.input-error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    });
}

// New Message Button Handler
document.querySelector('.new-message-btn')?.addEventListener('click', function() {
    const form = document.querySelector('.contact-form');
    const successMessage = document.querySelector('.form-success');
    
    form.style.display = 'flex';
    successMessage.style.display = 'none';
    
    // Focus on first input
    document.getElementById('name').focus();
});

// Real-time validation
document.getElementById('name')?.addEventListener('blur', function() {
    validateField(this, 'name');
});

document.getElementById('email')?.addEventListener('blur', function() {
    validateField(this, 'email');
});

document.getElementById('phone')?.addEventListener('blur', function() {
    validateField(this, 'phone');
});

document.getElementById('subject')?.addEventListener('change', function() {
    validateField(this, 'subject');
});

document.getElementById('message')?.addEventListener('blur', function() {
    validateField(this, 'message');
});

function validateField(input, fieldName) {
    const value = input.value.trim();
    const errorElement = input.parentElement.querySelector('.input-error');
    
    // Clear previous error
    input.classList.remove('error');
    errorElement.classList.remove('show');
    
    let error = null;
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                error = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                error = 'Please enter a valid phone number';
            }
            break;
        case 'subject':
            if (!value) {
                error = 'Please select a subject';
            }
            break;
        case 'message':
            if (value.length < 10) {
                error = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (error) {
        input.classList.add('error');
        errorElement.textContent = error;
        errorElement.classList.add('show');
    }
}

// Auto-format phone number
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format phone number (basic formatting)
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        } else {
            value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
    }
    
    e.target.value = value;
});

// Character counter for message
document.getElementById('message')?.addEventListener('input', function(e) {
    const charCount = e.target.value.length;
    const maxLength = 500;
    
    // You could add a character counter display here if needed
    if (charCount > maxLength) {
        e.target.value = e.target.value.substring(0, maxLength);
    }
});

// Quick Contact Button Analytics
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const platform = this.classList.contains('whatsapp-btn') ? 'WhatsApp' :
                       this.classList.contains('email-btn') ? 'Email' :
                       this.classList.contains('linkedin-btn') ? 'LinkedIn' : 'GitHub';
        
        // Track contact method (you could add analytics here)
        console.log(`Contact via ${platform}`);
    });
});

// Form field focus effects
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Newsletter Form Handler
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        showNotification('Successfully subscribed to newsletter!', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});
        return;
    }

    // Create mailto link
    const mailtoLink = `mailto:avij889@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Opening your email client...', 'success');
    
    // Reset form
    this.reset();
});

// Notification System
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    }

    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.skill-category, .project-card, .service-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal animations
window.addEventListener('scroll', reveal);
window.addEventListener('load', () => {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .service-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial reveal
    reveal();
});

// Typing Effect for Hero Title
function typeWriter() {
    const text = "Building Scalable Digital Solutions";
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            // Restore original text after typing animation
            setTimeout(() => {
                heroSubtitle.textContent = originalText;
            }, 2000);
        }
    }
    
    // Start typing effect after page load
    setTimeout(type, 1000);
}

// Initialize typing effect
window.addEventListener('load', typeWriter);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
    });
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-5px) scale(1)';
        } else {
            this.style.transform = 'scale(1.05)';
        }
    });
});

// Dark Mode Toggle (Optional Feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations
    reveal();
}, 10));

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console welcome message
console.log('%c Welcome to Avinash Jha\'s Portfolio! ', 'background: #2563eb; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Built with passion and expertise in Full-Stack Development ', 'background: #f59e0b; color: white; font-size: 12px; padding: 8px; border-radius: 5px;');
