// Main JavaScript for Resume Website
// Interactive components and animations

// Global variables
let particles = [];
let canvas;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSkillsChart();
    initParticleBackground();
    initSmoothScrolling();
    initTimelineAnimations();
});

// Scroll-triggered animations
function initScrollAnimations() {
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
        
        // Animate the reveal
        anime({
            targets: details,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
}

// Skills radar chart
function initSkillsChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        title: {
            text: 'Skills Proficiency',
            left: 'center',
            textStyle: {
                color: '#2C2C2C',
                fontSize: 18,
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
            axisName: {
                color: '#6B6B6B',
                fontSize: 12
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

// Particle background using p5.js
function initParticleBackground() {
    // Only run on larger screens to avoid performance issues
    if (window.innerWidth < 768) return;
    
    new p5((p) => {
        let particles = [];
        const numParticles = 50;
        
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
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
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
                    if (dist < 100) {
                        const opacity = p.map(dist, 0, 100, 0.1, 0);
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
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateX: entry.target.querySelector('.w-1/2.text-right') ? [-50, 0] : [50, 0],
                    duration: 800,
                    easing: 'easeOutQuad',
                    delay: Math.random() * 200
                });
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
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Form validation helper (for contact page)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Loading animation for page transitions
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'fixed inset-0 bg-off-white bg-opacity-90 flex items-center justify-center z-50';
    loader.innerHTML = `
        <div class="text-center">
            <div class="w-12 h-12 border-4 border-soft-teal border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-charcoal font-medium">Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
    return loader;
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

// Initialize progress bars animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.bg-soft-teal');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                
                anime({
                    targets: entry.target,
                    width: width,
                    duration: 1500,
                    easing: 'easeOutQuad',
                    delay: Math.random() * 300
                });
            }
        });
    });
    
    progressBars.forEach(bar => {
        if (bar.classList.contains('h-2')) {
            progressObserver.observe(bar);
        }
    });
}

// Call progress bar initialization
document.addEventListener('DOMContentLoaded', initProgressBars);

// Gradient text animation
function animateGradientText() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            text.style.background = `linear-gradient(135deg, hsl(${hue}, 60%, 50%), #2C2C2C)`;
            text.style.webkitBackgroundClip = 'text';
            text.style.webkitTextFillColor = 'transparent';
        }, 100);
    });
}

// Initialize gradient animation (subtle)
document.addEventListener('DOMContentLoaded', function() {
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        let phase = 0;
        setInterval(() => {
            phase += 0.02;
            const hue1 = Math.sin(phase) * 30 + 180; // Teal range
            const hue2 = Math.sin(phase + Math.PI) * 30 + 180;
            gradientText.style.background = `linear-gradient(135deg, hsl(${hue1}, 40%, 45%), hsl(${hue2}, 40%, 35%))`;
            gradientText.style.webkitBackgroundClip = 'text';
            gradientText.style.webkitTextFillColor = 'transparent';
        }, 50);
    }
});

// Parallax effect for hero image
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-content img');
    
    if (heroImage && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add subtle hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('a[class*="bg-soft-teal"], a[class*="border-soft-teal"]');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Console welcome message
console.log(`
👋 Welcome to Sevak Mkrtchyan's Professional Website!

Built with modern web technologies:
- HTML5 & CSS3
- Tailwind CSS
- Anime.js for animations
- ECharts.js for data visualization
- p5.js for creative coding

Looking for a motivated entry-level professional?
Get in touch: Sevakmkrtchyan08@gmail.com
`);