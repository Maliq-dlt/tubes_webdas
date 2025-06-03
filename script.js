function filterRecipes(category) {
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    if (buttons.length > 0) { 
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active-filter'));
                button.classList.add('active-filter');
                
                const category = button.getAttribute('data-filter');
                filterRecipes(category);
            });
        });
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            allButton.click();
        }
    }
}

function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const formMessage = document.getElementById('form-message');

    formMessage.innerHTML = ''; 

    if (!name || !email || !message) {
        console.error("Form elements not found");
        if(formMessage) formMessage.innerHTML = '<p class="text-danger">A form error occurred. Please refresh.</p>';
        return;
    }

    if (name.value.trim().length < 3) {
        formMessage.innerHTML = '<p class="text-danger">Name must be at least 3 characters.</p>';
        name.focus();
        return;
    }
    if (!email.value.includes('@') || email.value.trim().length < 5) {
        formMessage.innerHTML = '<p class="text-danger">Please enter a valid email.</p>';
        email.focus();
        return;
    }
    if (message.value.trim().length < 10) {
        formMessage.innerHTML = '<p class="text-danger">Message must be at least 10 characters.</p>';
        message.focus();
        return;
    }

    formMessage.innerHTML = '<p class="text-success">Message sent successfully! Thank you.</p>';
    setTimeout(() => {
        name.value = '';
        email.value = '';
        message.value = '';
        formMessage.innerHTML = '';
    }, 3000);
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.animationPlayState = 'running'; 
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 

    elements.forEach(element => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
    animateOnScroll();

    if (window.location.hash && window.location.pathname.includes('recipes.html')) {
        const targetModalId = window.location.hash;
        const modalElement = document.querySelector(targetModalId);
        if (modalElement && bootstrap.Modal) {
            // Check if it's a Bootstrap modal before trying to show
            const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modal.show();
        }
    }
});