// Main JavaScript for Resume Website
// Interactive components and animations

// Global variables
let particles = [];
let canvas;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimations();
    initSkillsChart();
    initParticleBackground();
    initSmoothScrolling();
    initTimelineAnimations();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Skip animations on mobile for better performance
    if (window.innerWidth < 768) {
        document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
            el.classList.add('active');
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate timeline items with stagger
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// Timeline experience toggle
function toggleExperience(id) {
    const details = document.getElementById(id + '-details');
    if (!details) return;
    
    const isVisible = !details.classList.contains('hidden');
    
    // Hide all other details first
    document.querySelectorAll('[id$="-details"]').forEach(el => {
        if (el !== details) {
            el.classList.add('hidden');
        }
    });
    
    // Toggle current details
    if (isVisible) {
        details.classList.add('hidden');
    } else {
        details.classList.remove('hidden');
        
        // Scroll to details on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        
        // Animate the reveal
        if (typeof anime !== 'undefined') {
            anime({
                targets: details,
                opacity: [0, 1],
                translateY: [-10, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }
}

// Skills radar chart
function initSkillsChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom || typeof echarts === 'undefined') return;
    
    // Make chart responsive
    const isMobile = window.innerWidth < 768;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        title: {
            text: 'Skills Proficiency',
            left: 'center',
            textStyle: {
                color: '#2C2C2C',
                fontSize: isMobile ? 14 : 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                const value = params.value;
                const level = value >= 90 ? 'Expert' : value >= 80 ? 'Advanced' : value >= 70 ? 'Intermediate' : 'Beginner';
                return `<strong>${params.name}</strong><br/>Proficiency: ${value}%<br/>Level: ${level}`;
            }
        },
        radar: {
            indicator: [
                { name: 'Customer Service', max: 100 },
                { name: 'IT Support', max: 100 },
                { name: 'Web Development', max: 100 },
                { name: 'Communication', max: 100 },
                { name: 'Problem Solving', max: 100 },
                { name: 'Time Management', max: 100 },
                { name: 'Social Media', max: 100 },
                { name: 'Graphic Design', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            center: ['50%', '55%'],
            radius: isMobile ? '60%' : '65%',
            axisName: {
                color: '#6B6B6B',
                fontSize: isMobile ? 10 : 12
            },
            splitLine: {
                lineStyle: {
                    color: '#F5F1EB'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(74, 155, 155, 0.1)', 'rgba(74, 155, 155, 0.05)']
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 90, 85, 90, 88, 85, 80, 70],
                name: 'Current Skills',
                areaStyle: {
                    color: 'rgba(74, 155, 155, 0.3)'
                },
                lineStyle: {
                    color: '#4A9B9B',
                    width: 3
                },
                itemStyle: {
                    color: '#4A9B9B'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    myChart.setOption(option);
    
    // Make chart responsive
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// Particle background using p5.js - disabled on mobile
function initParticleBackground() {
    // Only run on larger screens to avoid performance issues
    if (window.innerWidth < 1024 || typeof p5 === 'undefined') return;
    
    new p5((p) => {
        let particles = [];
        const numParticles = 30;
        
        p.setup = function() {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('p5-canvas');
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '1');
            canvas.style('opacity', '0.3');
            
            // Initialize particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.3, 0.3),
                    vy: p.random(-0.3, 0.3),
                    size: p.random(2, 5),
                    opacity: p.random(0.1, 0.3)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(74, 155, 155, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
            
            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    if (dist < 80) {
                        const opacity = p.map(dist, 0, 80, 0.1, 0);
                        p.stroke(74, 155, 155, opacity * 255);
                        p.strokeWeight(1);
                        p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    }
                }
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Timeline animations
function initTimelineAnimations() {
    // Skip on mobile
    if (window.innerWidth < 768) return;
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateX: entry.target.querySelector('.md\\:text-right') ? [-50, 0] : [50, 0],
                        duration: 800,
                        easing: 'easeOutQuad',
                        delay: Math.random() * 200
                    });
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Skill cards hover effects
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Skip hover effects on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    });
});

// Form validation helper (for contact page)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for delayed animations
function animateOnScroll(selector, animation) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animation(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
}

// Console welcome message
console.log(`
👋 Welcome to Sevak Mkrtchyan's Professional Website!

Built with modern web technologies:
- HTML5 & CSS3
- Tailwind CSS
- Anime.js for animations
- ECharts.js for data visualization

Looking for a motivated IT Support Technician?
Get in touch: Sevakmkrtchyan08@gmail.com
`);
