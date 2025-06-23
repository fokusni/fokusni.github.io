document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    burgerMenu.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Scroll reveal animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    scrollReveal.reveal('.feature-card', { interval: 200 });
    scrollReveal.reveal('.gallery-item', { interval: 200 });
    scrollReveal.reveal('.footer-col', { interval: 200 });

    // Sticky header on scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        }
        
        if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
});



// Form validation for all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        let valid = true;
        
        // Check required fields
        this.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                valid = false;
                
                // Add error message
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Это поле обязательно для заполнения';
                    errorMsg.style.color = 'red';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '5px';
                    field.after(errorMsg);
                }
            } else {
                field.style.borderColor = '';
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
        
        // Email validation
        const emailFields = this.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                field.style.borderColor = 'red';
                valid = false;
                
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Введите корректный email';
                    errorMsg.style.color = 'red';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '5px';
                    field.after(errorMsg);
                }
            }
        });
        
        if (!valid) {
            e.preventDefault();
            
            // Scroll to first error
            const firstError = this.querySelector('[style="border-color: red;"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});

// Image lazy loading
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers without native lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        lazyLoadObserver.observe(img);
    });
}

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.title = 'Наверх';
backToTopBtn.style.display = 'none';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add styles for back to top button
const backToTopStyles = document.createElement('style');
backToTopStyles.textContent = `
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 999;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.back-to-top:hover {
    background-color: var(--primary-color);
    transform: translateY(-5px);
}
`;
document.head.appendChild(backToTopStyles);

// Testimonials functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.getElementById('testimonialModal');
    const addBtn = document.getElementById('addTestimonialBtn');
    const closeBtn = document.querySelector('.close-modal');
    const testimonialForm = document.getElementById('testimonialForm');
    
    if (addBtn) {
        // Open modal
        addBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (testimonialForm) {
        // Form submission
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('clientName').value;
            const email = document.getElementById('clientEmail').value;
            const rating = document.getElementById('clientRating').value;
            const message = document.getElementById('clientMessage').value;
            const photo = document.getElementById('clientPhoto').files[0];
            
            // Create new testimonial (in a real app, this would be sent to server)
            const testimonialsGrid = document.querySelector('.testimonials-grid');
            if (testimonialsGrid) {
                const newTestimonial = document.createElement('div');
                newTestimonial.className = 'testimonial-card';
                newTestimonial.innerHTML = `
                    <div class="testimonial-header">
                        <div class="client-avatar">
                            ${photo ? `<img src="${URL.createObjectURL(photo)}" alt="${name}">` : '<div class="avatar-placeholder">' + name.charAt(0) + '</div>'}
                        </div>
                        <div class="client-info">
                            <h3>${name}</h3>
                            <div class="client-rating">
                                ${'★'.repeat(rating) + '☆'.repeat(5 - rating)}
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-content">
                        <p>"${message}"</p>
                    </div>
                    <div class="testimonial-date">
                        ${new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                `;
                
                testimonialsGrid.prepend(newTestimonial);
                
                // Close modal and reset form
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                testimonialForm.reset();
                
                // Show success message
                alert('Спасибо за ваш отзыв! Он появится на сайте после модерации.');
            }
        });
    }
    
    // Rating stars hover effect
    document.querySelectorAll('.client-rating').forEach(rating => {
        rating.addEventListener('mouseover', function(e) {
            if (e.target.tagName === 'SPAN') {
                const stars = this.querySelectorAll('span');
                const hoverValue = e.target.dataset.value;
                
                stars.forEach((star, index) => {
                    if (index < hoverValue) {
                        star.style.color = 'var(--secondary-color)';
                    } else {
                        star.style.color = '#ccc';
                    }
                });
            }
        });
        
        rating.addEventListener('mouseout', function() {
            const activeStars = this.dataset.rating;
            const stars = this.querySelectorAll('span');
            
            stars.forEach((star, index) => {
                star.style.color = index < activeStars ? 'var(--secondary-color)' : '#ccc';
            });
        });
    });
});