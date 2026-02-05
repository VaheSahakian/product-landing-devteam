/**
 * FitPulse Landing Page JavaScript
 * Basic interactivity placeholder
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('FitPulse Landing Page loaded');

    // Initialize components
    initNavigation();
    initCTAButtons();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * CTA Button handlers
 */
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.hero__cta, .pricing-card .btn');

    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Placeholder for future modal functionality
            console.log('CTA clicked:', button.textContent);
        });
    });
}
