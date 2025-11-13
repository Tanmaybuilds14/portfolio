// DOM Elements
const loader = document.querySelector('.loader-wrapper');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const typedTextSpan = document.querySelector('.typed-text');
const projectsGrid = document.querySelector('.projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const skillBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');

// Initialize
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupTheme();
    // removed duplicate call to typeWriter to avoid conflicts with the guarded typed-role
    // typeWriter();
    loadProjects();
    setupFilters();
    setupContactForm();
    observeElements();
}

// Navigation
function setupNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Navbar background on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Theme Toggle
function setupTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Typed Text Effect
function typeWriter() {
    const textArray = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Projects Data
const projectsData = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        image: 'https://via.placeholder.com/600x400',
        category: 'web',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com',
        demo: 'https://example.com',
        details: 'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment processing, and order tracking.'
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates',
        image: 'https://via.placeholder.com/600x400',
        category: 'web',
        technologies: ['Vue.js', 'Firebase', 'Vuex', 'Socket.io'],
        github: 'https://github.com',
        demo: 'https://example.com',
        details: 'A real-time collaborative task management application that allows teams to organize, track, and manage their projects efficiently.'
    },
    {
        id: 3,
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication',
        image: 'https://via.placeholder.com/600x400',
        category: 'mobile',
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
        github: 'https://github.com',
        demo: 'https://example.com',
        details: 'A secure mobile banking application featuring biometric authentication, transaction history, fund transfers, and bill payments.'
    },
    {
        id: 4,
        title: 'Portfolio Website',
        description: 'Modern portfolio website with dynamic content',
        image: 'https://via.placeholder.com/600x400',
        category: 'design',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
        github: 'https://github.com',
        demo: 'https://example.com',
        details: 'A modern, responsive portfolio website showcasing creative work with smooth animations and interactive elements.'
    },
    {
        id: 5,
        title: 'Weather Dashboard',
        description: 'Real-time weather monitoring dashboard with forecasting',
        image: 'https://via.placeholder.com/600x400',
        category: 'web',
        technologies: ['React', 'Chart.js', 'OpenWeather API', 'Redux'],
        github: 'https://github.com',
        demo: 'https://example.com',
        details: 'A comprehensive weather dashboard providing real-time weather data, forecasts, and interactive charts for multiple locations.'
    },
    {
        id: 6,
        title: 'Social Media App',
        description: 'Social networking platform with real-time messaging',
        image: 'https://via.placeholder.com/600x400',
        category: 'mobile',
        technologies: ['Flutter', 'Firebase', 'Cloud Firestore', 'FCM'],
        github: 'https://github.com',
        demo: 'https://example.com',
        details: 'A feature-rich social media application with user profiles, posts, comments, likes, and real-time messaging capabilities.'
    }
];

// Load Projects
function loadProjects(category = 'all') {
    projectsGrid.innerHTML = '';
    
    const filteredProjects = category === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === category);
    
    filteredProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
                <button class="btn btn-primary" onclick="viewProject(${project.id})">View Details</button>
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank">
                    <i class="fab fa-github"></i> Code
                </a>
                <a href="${project.demo}" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Demo
                </a>
            </div>
        </div>
    `;
    return card;
}

// View Project Details
window.viewProject = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
        <h2>${project.title}</h2>
        <p style="color: var(--text-light); margin: 20px 0;">${project.details}</p>
        <div class="project-tech" style="margin: 20px 0;">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links" style="margin-top: 30px;">
            <a href="${project.github}" target="_blank" class="btn btn-primary">
                <i class="fab fa-github"></i> View Code
            </a>
            <a href="${project.demo}" target="_blank" class="btn btn-secondary">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    `;
    
    projectModal.classList.add('show');
}

// Close Modal
modalClose.addEventListener('click', () => {
    projectModal.classList.remove('show');
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('show');
    }
});

// Filter Projects
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.filter;
            loadProjects(category);
        });
    });
}

// Contact Form
function setupContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease'
    });
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Intersection Observer for Animations
function observeElements() {
    // Animate skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Animate counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.target);
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                        entry.target.classList.add('counted');
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => counterObserver.observe(number));
}

// Smooth Scroll for Safari
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

// Add custom styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Parallax Effect (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Initialize AOS-like animations
document.addEventListener('DOMContentLoaded', () => {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .about-text, .stat-card, .skill-category, .timeline-item');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('animated')) {
                element.style.animation = 'fadeInUp 0.6s ease forwards';
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});

// typed-role (guarded, single instance)
if (!window._typedInitialized) {
    window._typedInitialized = true;

    const typedStrings = [
      "Backend Developer",
      "Machine Learning Engineer"
    ];

    (function () {
      const typedEl = document.querySelector(".typed-text");
      const cursorEl = document.querySelector(".cursor");
      if (!typedEl) return;

      // ensure clean start
      typedEl.textContent = "";
      let typingSpeed = 100;
      let erasingSpeed = 50;
      let delayAfter = 1200;

      let strIndex = 0;
      let charIndex = 0;

      // simple cursor blink
      if (cursorEl) {
        cursorEl.classList.remove("hidden");
        setInterval(() => cursorEl.classList.toggle("visible"), 500);
      }

      function type() {
        const current = typedStrings[strIndex];
        if (charIndex < current.length) {
          typedEl.textContent = current.slice(0, charIndex + 1); // replace, not append
          charIndex++;
          setTimeout(type, typingSpeed);
        } else {
          setTimeout(erase, delayAfter);
        }
      }

      function erase() {
        const current = typedStrings[strIndex];
        if (charIndex > 0) {
          typedEl.textContent = current.slice(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, erasingSpeed);
        } else {
          strIndex = (strIndex + 1) % typedStrings.length;
          setTimeout(type, 200);
        }
      }

      document.addEventListener("DOMContentLoaded", () => {
        // in case script loaded after DOM ready
        if (document.readyState === "complete" || document.readyState === "interactive") {
          type();
        } else {
          type();
        }
      });
    })();
}

// open console and run
document.querySelectorAll('.social-links a').forEach(a=>{
  const listeners = getEventListeners ? getEventListeners(a).click : 'no getEventListeners';
  console.log(a, listeners);
  window.open(document.querySelector('.social-links a').href, '_blank');
});