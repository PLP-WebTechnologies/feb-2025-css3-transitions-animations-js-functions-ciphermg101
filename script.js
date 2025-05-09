
// DOM elements
const themeToggle = document.getElementById('theme-toggle');
const resetBtn = document.getElementById('reset-btn');
const body = document.body;
const notification = document.getElementById('notification');
const cards = document.querySelectorAll('.card');

// Check if user has a saved theme preference
function loadUserPreference() {
    const darkMode = localStorage.getItem('darkMode');
    
    // Apply saved preference
    if (darkMode === 'enabled') {
        body.classList.add('dark-theme');
        themeToggle.textContent = 'Toggle Light Mode';
    } else {
        body.classList.remove('dark-theme');
        themeToggle.textContent = 'Toggle Dark Mode';
    }
}

// Toggle theme function
function toggleTheme(event) {
    // Create ripple effect
    createRipple(event);
    
    // Toggle dark theme
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('darkMode', 'disabled');
        themeToggle.textContent = 'Toggle Dark Mode';
        showNotification('Light mode activated!');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('darkMode', 'enabled');
        themeToggle.textContent = 'Toggle Light Mode';
        showNotification('Dark mode activated!');
    }
    
    // Animate cards on theme change
    animateCards();
}

// Create ripple effect animation
function createRipple(event) {
    const button = event.currentTarget;
    
    // Remove existing ripples
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    // Position the ripple
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    button.appendChild(circle);
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Animate cards with a staggered effect
function animateCards() {
    cards.forEach((card, index) => {
        // Remove existing animation
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        
        // Add animation with delay
        card.style.animation = `cardEntrance 0.5s ease-out ${index * 0.1}s both`;
    });
}

// Reset user preferences
function resetPreferences() {
    localStorage.removeItem('darkMode');
    body.classList.remove('dark-theme');
    themeToggle.textContent = 'Toggle Dark Mode';
    showNotification('Preferences reset!');
    animateCards();
}

// Add event listeners
themeToggle.addEventListener('click', toggleTheme);
resetBtn.addEventListener('click', resetPreferences);

// Add ripple effect to reset button
resetBtn.addEventListener('click', createRipple);

// Load user preferences on page load
document.addEventListener('DOMContentLoaded', () => {
    loadUserPreference();
    animateCards();
});