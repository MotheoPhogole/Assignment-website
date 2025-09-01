// scripts.js
// Global JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('span');
            if (mobileMenu.classList.contains('show')) {
                icon.innerHTML = '✕';
            } else {
                icon.innerHTML = '☰';
            }
        });
    }
    
    // Set active navigation link
    setActiveNavLink();
});

// Toast notification system
class ToastManager {
    constructor() {
        this.container = this.createContainer();
        document.body.appendChild(this.container);
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        return container;
    }
    
    show(options) {
        const { title, description, variant = 'default' } = options;
        
        const toast = document.createElement('div');
        toast.className = `toast ${variant}`;
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${description ? `<div class="toast-description">${description}</div>` : ''}
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
        `;
        
        this.container.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
}

// Initialize toast manager
const toast = new ToastManager();

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === '' && href === 'index.html') ||
            href === currentPage
        ) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Form validation helper
function validateInput(input, rules) {
    const value = input.value.trim();
    const errors = [];
    
    if (rules.required && !value) {
        errors.push('This field is required');
    }
    
    if (rules.type === 'number' && value) {
        const num = Number(value);
        if (isNaN(num)) {
            errors.push('Please enter a valid number');
        } else if (rules.min !== undefined && num < rules.min) {
            errors.push(`Value must be at least ${rules.min}`);
        } else if (rules.max !== undefined && num > rules.max) {
            errors.push(`Value must be no more than ${rules.max}`);
        }
    }
    
    return errors;
}

// Show field error
function showFieldError(input, message) {
    // Remove existing error
    clearFieldError(input);
    
    // Add error class
    input.classList.add('error');
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insert after input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

// Clear field error
function clearFieldError(input) {
    input.classList.remove('error');
    
    const nextElement = input.nextElementSibling;
    if (nextElement && nextElement.classList.contains('error-message')) {
        nextElement.remove();
    }
}

// Export for use in other scripts
window.toast = toast;
window.validateInput = validateInput;
window.showFieldError = showFieldError;
window.clearFieldError = clearFieldError;