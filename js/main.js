// Vinalink Proposal Landing Page - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE NAVIGATION ==========
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close nav when clicking outside
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Close nav when clicking on a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // ========== STICKY HEADER ==========
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ========== SMOOTH SCROLLING ==========
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.summary-card, .why-card, .feature-card, .case-card, .pricing-card, .phase-card, .goal-card');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ========== ACTIVE NAVIGATION ==========
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.includes(current)) {
                item.classList.add('active');
            }
        });
    });
    
    // ========== COUNTER ANIMATION ==========
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number
            const formatted = Math.floor(current).toLocaleString('vi-VN');
            element.textContent = formatted;
        }, 16);
    }
    
    // Animate stat numbers when in viewport
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number) && number > 0) {
                    animateCounter(entry.target, number);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ========== FORM HANDLING (CTA BUTTONS) ==========
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            
            // Analytics tracking (if needed)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'button_text': text,
                    'button_location': this.closest('section')?.id || 'unknown'
                });
            }
            
            // Show confirmation for specific actions
            if (text.includes('Xác Nhận') || text.includes('Chọn Gói')) {
                // Could open a modal or redirect to contact form
                console.log('CTA clicked:', text);
            }
        });
    });
    
    // ========== PRICING CARDS INTERACTION ==========
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle scale effect handled by CSS
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = '';
            }
        });
    });
    
    // ========== TOOLTIP / POPUP FUNCTIONALITY ==========
    // Add tooltips for technical terms if needed
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 9999;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + window.pageYOffset + 'px';
            
            this._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
    
    // ========== LAZY LOADING IMAGES ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========== CONSOLE MESSAGE ==========
    console.log('%c🚀 Vinalink Proposal Landing Page', 'color: #E31E24; font-size: 20px; font-weight: bold;');
    console.log('%cPhát triển bởi Vinalink - Digital Marketing & Web Development', 'color: #666; font-size: 12px;');
    console.log('%c📧 support@vinalink.vn | 📞 0915 157 599', 'color: #666; font-size: 12px;');
    
    // ========== PERFORMANCE MONITORING ==========
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                console.log(`⚡ Page load time: ${(pageLoadTime / 1000).toFixed(2)}s`);
                
                // Send to analytics if needed
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        'name': 'page_load',
                        'value': pageLoadTime,
                        'event_category': 'Performance'
                    });
                }
            }, 0);
        });
    }
    
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number to Vietnamese locale
function formatNumber(num) {
    return num.toLocaleString('vi-VN');
}

// Format currency
function formatCurrency(num) {
    return num.toLocaleString('vi-VN') + ' VND';
}

// ========== EXPORT FOR EXTERNAL USE ==========
window.VinalinkProposal = {
    debounce,
    throttle,
    formatNumber,
    formatCurrency
};