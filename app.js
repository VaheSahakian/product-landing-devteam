/**
 * FitPulse Landing Page JavaScript
 * UX Enhancements: Sticky Navbar, Smooth Scroll, Modal
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initStickyNavbar();
    initSmoothScroll();
    initActiveSectionHighlight();
    initModal();
});

/**
 * Sticky Navbar - Add shadow on scroll
 */
function initStickyNavbar() {
    const header = document.querySelector('.header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Smooth Scroll Navigation
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Active Section Highlight using Intersection Observer
 */
function initActiveSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
}

/**
 * Modal Functionality
 */
function initModal() {
    const modal = document.getElementById('ctaModal');
    const form = document.getElementById('ctaForm');
    const ctaButtons = document.querySelectorAll('.hero__cta');
    const closeButtons = modal.querySelectorAll('[data-modal-close]');

    // Open modal
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => openModal(modal));
    });

    // Close modal - X button and overlay
    closeButtons.forEach(button => {
        button.addEventListener('click', () => closeModal(modal));
    });

    // Close modal - Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal(modal);
        }
    });

    // Form validation and submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(form)) {
            handleFormSubmit(form, modal);
        }
    });

    // Real-time validation on input
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('form-group--error')) {
                validateField(input);
            }
        });
    });
}

/**
 * Open modal
 */
function openModal(modal) {
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus first input
    const firstInput = modal.querySelector('.form-input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

/**
 * Close modal
 */
function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    // Reset form
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        clearFormErrors(form);
    }
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('.form-input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validate single field
 */
function validateField(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    let isValid = true;

    // Clear previous error
    formGroup.classList.remove('form-group--error');
    input.classList.remove('form-input--error');

    // Required validation
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorElement.textContent = `Please enter your ${input.name}`;
    }

    // Email validation
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            errorElement.textContent = 'Please enter a valid email address';
        }
    }

    if (!isValid) {
        formGroup.classList.add('form-group--error');
        input.classList.add('form-input--error');
    }

    return isValid;
}

/**
 * Clear all form errors
 */
function clearFormErrors(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('form-group--error');
        const input = group.querySelector('.form-input');
        if (input) input.classList.remove('form-input--error');
    });
}

/**
 * Handle form submission
 */
function handleFormSubmit(form, modal) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form submitted:', data);

    // Show success (in a real app, this would send to a server)
    alert(`Thanks for signing up, ${data.name}! We'll be in touch soon.`);
    closeModal(modal);
}
