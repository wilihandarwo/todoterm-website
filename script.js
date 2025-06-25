// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Copy install command functionality
function copyInstallCommand() {
    const command = 'npm install -g todoterm';
    copyToClipboard(command);
}

// Copy command functionality for install cards
function copyCommand(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        copyToClipboard(element.textContent);
    }
}

// Generic copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCopyNotification();
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyNotification();
    });
}

// Show copy notification
function showCopyNotification() {
    const notification = document.getElementById('copy-notification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Animate terminal content on scroll
function animateTerminal() {
    const terminal = document.querySelector('.terminal-window');
    const terminalRect = terminal.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (terminalRect.top < windowHeight && terminalRect.bottom > 0) {
        // Terminal is in viewport
        if (!terminal.classList.contains('animated')) {
            terminal.classList.add('animated');
            animateTerminalLines();
        }
    }
}

// Animate terminal lines typing effect
function animateTerminalLines() {
    const lines = document.querySelectorAll('.terminal-line, .ascii-art, .terminal-subtitle, .project-info, .table-row');
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            line.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, 50);
        }, index * 150);
    });
}

// Animate feature cards on scroll
function animateFeatureCards() {
    const cards = document.querySelectorAll('.feature-card, .install-card, .doc-card');
    
    cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (cardRect.top < windowHeight - 100 && !card.classList.contains('animated')) {
            card.classList.add('animated');
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}

// Animate spinner in features
function animateSpinner() {
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let index = 0;
        
        setInterval(() => {
            spinner.textContent = spinnerChars[index];
            index = (index + 1) % spinnerChars.length;
        }, 100);
    }
}

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && !stat.classList.contains('counted')) {
            stat.classList.add('counted');
            const target = stat.textContent;
            
            if (target === '2.0') {
                animateDecimalCounter(stat, 0, 2.0, 1000);
            } else if (target === '0') {
                animateCounter(stat, 0, 0, 500);
            }
        }
    });
}

// Counter animation for numbers
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Counter animation for decimal numbers
function animateDecimalCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = current.toFixed(1);
    }, 16);
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
}

// Header background on scroll
function updateHeaderOnScroll() {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Add random floating particles
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
        `;
        hero.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all animations and effects
function init() {
    // Set initial opacity for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .install-card, .doc-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });
    
    // Start animations
    animateSpinner();
    createFloatingParticles();
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        animateTerminal();
        animateFeatureCards();
        animateStats();
        parallaxEffect();
        updateHeaderOnScroll();
    });
    
    // Initial check for elements in viewport
    animateTerminal();
    animateFeatureCards();
    animateStats();
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.keyCode);
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        // Easter egg: Rain of emojis
        createEmojiRain();
        window.konamiSequence = [];
    }
});

// Easter egg: Emoji rain
function createEmojiRain() {
    const emojis = ['📝', '✨', '🚀', '🎉', '💎', '🌟', '⭐', '🔥'];
    const body = document.body;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: 2rem;
                pointer-events: none;
                z-index: 9999;
                animation: emoji-fall 3s linear forwards;
            `;
            
            body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 3000);
        }, i * 100);
    }
    
    // Add CSS for emoji fall animation
    if (!document.querySelector('#emoji-style')) {
        const style = document.createElement('style');
        style.id = 'emoji-style';
        style.textContent = `
            @keyframes emoji-fall {
                to { 
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show special message
    const notification = document.getElementById('copy-notification');
    notification.textContent = '🎉 TodoTerm Magic Activated!';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        notification.textContent = '✅ Copied to clipboard!';
    }, 3000);
}
