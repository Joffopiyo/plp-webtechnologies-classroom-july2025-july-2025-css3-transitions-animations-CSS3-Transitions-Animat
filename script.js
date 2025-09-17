// ===== GLOBAL VARIABLES =====
// These are in the global scope and accessible throughout the application
const ANIMATION_DURATION = 500; // Base animation duration in ms
const DEFAULT_COLOR = '#3498db'; // Default color for animations

// ===== UTILITY FUNCTIONS =====

/**
 * Toggle a CSS class on an element
 * @param {string} elementId - The ID of the element to modify
 * @param {string} className - The class to toggle
 * @returns {boolean} - Whether the class is now present
 */
function toggleClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle(className);
        return element.classList.contains(className);
    }
    return false;
}

/**
 * Add a CSS class to an element
 * @param {string} elementId - The ID of the element to modify
 * @param {string} className - The class to add
 */
function addClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Remove a CSS class from an element
 * @param {string} elementId - The ID of the element to modify
 * @param {string} className - The class to remove
 */
function removeClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove(className);
    }
}

/**
 * Check if an element has a specific class
 * @param {string} elementId - The ID of the element to check
 * @param {string} className - The class to check for
 * @returns {boolean} - Whether the element has the class
 */
function hasClass(elementId, className) {
    const element = document.getElementById(elementId);
    return element && element.classList.contains(className);
}

/**
 * Calculate animation duration based on element dimensions
 * @param {string} elementId - The ID of the element
 * @param {number} baseDuration - Base duration in milliseconds
 * @returns {number} - Calculated duration
 */
function calculateAnimationDuration(elementId, baseDuration) {
    const element = document.getElementById(elementId);
    if (!element) return baseDuration;
    
    // Simple calculation based on element area
    const area = element.offsetWidth * element.offsetHeight;
    const areaFactor = Math.min(1.5, 1 + (area / 50000)); // Scale factor based on area
    
    return baseDuration * areaFactor;
}

/**
 * Validate if a string is a valid CSS color
 * @param {string} color - The color string to validate
 * @returns {boolean} - Whether the color is valid
 */
function isValidColor(color) {
    // Create a temporary element to test the color
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

// ===== ANIMATION CONTROL FUNCTIONS =====

/**
 * Toggle animation play state for an element
 * @param {string} elementId - The ID of the element with animation
 * @returns {boolean} - Whether the animation is now running
 */
function toggleAnimationPlayState(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return false;
    
    const isPaused = element.style.animationPlayState === 'paused';
    element.style.animationPlayState = isPaused ? 'running' : 'paused';
    
    return !isPaused;
}

/**
 * Start an animation by adding a class
 * @param {string} elementId - The ID of the element to animate
 * @param {string} animationClass - The animation class to add
 * @param {number} duration - Optional custom duration
 */
function startAnimation(elementId, animationClass, duration = null) {
    const element = document.getElementById(elementId);
    if (element && duration) {
        element.style.animationDuration = `${duration}ms`;
    }
    addClass(elementId, animationClass);
}

/**
 * Stop an animation by removing a class
 * @param {string} elementId - The ID of the element to stop animating
 * @param {string} animationClass - The animation class to remove
 */
function stopAnimation(elementId, animationClass) {
    removeClass(elementId, animationClass);
}

/**
 * Change the color of an element with a transition effect
 * @param {string} elementId - The ID of the element to modify
 * @param {string} color - The new color value
 * @returns {boolean} - Whether the color was successfully changed
 */
function changeElementColor(elementId, color) {
    if (!isValidColor(color)) {
        console.error('Invalid color value:', color);
        return false;
    }
    
    const element = document.getElementById(elementId);
    if (element) {
        element.style.backgroundColor = color;
        return true;
    }
    return false;
}

// ===== EVENT HANDLERS =====

/**
 * Handle color transformation button click
 * This function demonstrates local scope with parameters and return values
 */
function handleColorTransform() {
    const colorInput = document.getElementById('color-input');
    const color = colorInput.value.trim();
    
    if (!color) {
        alert('Please enter a color value');
        return false;
    }
    
    // This variable is locally scoped to this function
    const success = changeElementColor('color-box', color);
    
    if (success) {
        // Create a local scope with a block
        {
            const message = `Color changed to ${color} successfully!`;
            console.log(message);
        }
        // message is not accessible here - it's out of scope
        return true;
    } else {
        alert('Invalid color value. Please enter a valid CSS color.');
        return false;
    }
}

/**
 * Initialize all event listeners for the application
 * This function has its own local scope
 */
function initializeEventListeners() {
    // Fade box toggle
    document.getElementById('fade-btn').addEventListener('click', function() {
        toggleClass('fade-box', 'active');
    });
    
    // Slide box toggle
    document.getElementById('slide-btn').addEventListener('click', function() {
        toggleClass('slide-box', 'active');
    });
    
    // Bounce animation toggle
    document.getElementById('bounce-toggle').addEventListener('click', function() {
        const isRunning = toggleAnimationPlayState('bounce-box');
        this.textContent = isRunning ? 'Stop Bouncing' : 'Start Bouncing';
    });
    
    // Pulse animation toggle
    document.getElementById('pulse-toggle').addEventListener('click', function() {
        const isRunning = toggleAnimationPlayState('pulse-box');
        this.textContent = isRunning ? 'Stop Pulsing' : 'Start Pulsing';
    });
    
    // Loader animation toggle
    document.getElementById('loader-toggle').addEventListener('click', function() {
        const loaderDots = document.querySelectorAll('.loader-dot');
        const isRunning = loaderDots[0].style.animationPlayState !== 'paused';
        
        loaderDots.forEach(dot => {
            dot.style.animationPlayState = isRunning ? 'paused' : 'running';
        });
        
        this.textContent = isRunning ? 'Start Loading' : 'Stop Loading';
    });
    
    // Card flip
    document.getElementById('card-container').addEventListener('click', function() {
        toggleClass('card', 'flipped');
    });
    
    // Modal open
    document.getElementById('modal-open').addEventListener('click', function() {
        addClass('modal-overlay', 'active');
    });
    
    // Modal close
    document.getElementById('modal-close').addEventListener('click', function() {
        removeClass('modal-overlay', 'active');
    });
    
    // Modal close when clicking outside
    document.getElementById('modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            removeClass('modal-overlay', 'active');
        }
    });
    
    // Color transformation
    document.getElementById('color-btn').addEventListener('click', handleColorTransform);
    
    // Allow pressing Enter in the color input
    document.getElementById('color-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleColorTransform();
        }
    });
}

// ===== INITIALIZATION =====

/**
 * Initialize the application when DOM is loaded
 * This function demonstrates module pattern with local scope
 */
(function init() {
    // Set up event listeners when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeEventListeners();
        
        // Calculate and set custom animation duration for bounce box
        const bounceDuration = calculateAnimationDuration('bounce-box', 2000);
        document.getElementById('bounce-box').style.animationDuration = `${bounceDuration}ms`;
        
        console.log('Application initialized successfully!');
    });
})();