document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect sound for artist cards
    const artistCards = document.querySelectorAll('.artist-card');
    let currentlyPlaying = null;

    artistCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });

        card.addEventListener('click', () => {
            if (currentlyPlaying === card) {
                card.classList.remove('playing');
                currentlyPlaying = null;
            } else {
                if (currentlyPlaying) {
                    currentlyPlaying.classList.remove('playing');
                }
                card.classList.add('playing');
                currentlyPlaying = card;
            }
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover animations for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Initialize sections with fade-in effect
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-in-out';
        observer.observe(section);
    });

    // Add parallax effect to header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        header.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Add tooltip functionality for skills
    const skillItems = document.querySelectorAll('.skill-category p');
    skillItems.forEach(item => {
        item.setAttribute('title', 'Click to see projects using these skills');
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', () => {
            const skill = item.textContent.toLowerCase();
            const projects = document.querySelectorAll('.project-item');
            
            projects.forEach(project => {
                if (project.textContent.toLowerCase().includes(skill)) {
                    project.style.backgroundColor = 'rgba(29, 185, 84, 0.1)';
                    setTimeout(() => {
                        project.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }, 1500);
                }
            });
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });
        
        // Trigger initial fade-in
        setTimeout(() => {
            sections.forEach(section => {
                if (isElementInViewport(section)) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
        }, 100);
    });

    // Utility function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add theme toggle functionality
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.padding = '10px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.background = 'var(--spotify-dark-gray)';
    themeToggle.style.border = 'none';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '1000';
    
    document.body.appendChild(themeToggle);

    let isDark = true;
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.style.background = isDark ? 'var(--spotify-black)' : '#ffffff';
        document.body.style.color = isDark ? '#ffffff' : '#121212';
        themeToggle.innerHTML = isDark ? '🌙' : '☀️';
        
        // Update section backgrounds
        sections.forEach(section => {
            section.style.background = isDark ? 'var(--spotify-dark-gray)' : '#f5f5f5';
        });
    });
});