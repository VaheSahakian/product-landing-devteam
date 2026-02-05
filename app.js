/**
 * FitPulse Landing Page JavaScript
 * Gallery and Lightbox functionality
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCTAButtons();
    initGallery();
    initLightbox();
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
            console.log('CTA clicked:', button.textContent);
        });
    });
}

/**
 * Gallery filtering
 */
function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery__item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            button.classList.add('filter-btn--active');

            // Filter items
            galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.classList.remove('gallery__item--hidden');
                } else {
                    item.classList.add('gallery__item--hidden');
                }
            });
        });
    });
}

/**
 * Lightbox functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery__item');
    const closeButtons = lightbox.querySelectorAll('[data-lightbox-close]');
    const prevButton = lightbox.querySelector('.lightbox__nav--prev');
    const nextButton = lightbox.querySelector('.lightbox__nav--next');

    let currentIndex = 0;
    let visibleItems = [];

    // Update visible items array based on current filter
    function updateVisibleItems() {
        visibleItems = Array.from(document.querySelectorAll('.gallery__item:not(.gallery__item--hidden)'));
    }

    // Open lightbox
    function openLightbox(index) {
        updateVisibleItems();
        currentIndex = index;
        updateLightboxContent();
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
    }

    // Update lightbox content
    function updateLightboxContent() {
        const item = visibleItems[currentIndex];
        if (!item) return;

        const placeholder = item.querySelector('.gallery__placeholder');
        const label = item.querySelector('.gallery__label');
        const style = placeholder.getAttribute('style');

        lightboxImage.setAttribute('style', style);
        lightboxCaption.textContent = label.textContent;
    }

    // Navigate to previous
    function goToPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxContent();
    }

    // Navigate to next
    function goToNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightboxContent();
    }

    // Click handlers for gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            updateVisibleItems();
            const index = visibleItems.indexOf(item);
            if (index !== -1) {
                openLightbox(index);
            }
        });
    });

    // Close button handlers
    closeButtons.forEach(button => {
        button.addEventListener('click', closeLightbox);
    });

    // Navigation handlers
    prevButton.addEventListener('click', goToPrev);
    nextButton.addEventListener('click', goToNext);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.getAttribute('aria-hidden') === 'false') {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    goToPrev();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
            }
        }
    });
}
