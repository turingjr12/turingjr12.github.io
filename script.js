 // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

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

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Contact form handling
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message envoyé avec succès! Je vous répondrai bientôt.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Mobile menu toggle (basic implementation)
        document.getElementById('mobile-menu').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Typing effect for hero subtitle
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Start typing effect after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const subtitle = document.querySelector('.hero-text .subtitle');
                typeWriter(subtitle, 'Développeur Full Stack', 150);
            }, 2000);
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Skills animation on hover
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            skill.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Project cards hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });

        // Service cards animation
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon');
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Add floating animation to hero avatar
        const heroAvatar = document.querySelector('.hero-avatar');
        if (heroAvatar) {
            let position = 0;
            
            setInterval(() => {
                position += 0.1;
                const yOffset = Math.sin(position) * 10;
                heroAvatar.style.transform = `translateY(${yOffset}px) scale(${1 + Math.sin(position) * 0.05})`;
            }, 50);
        }

        // Progressive enhancement for reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable animations for users who prefer reduced motion
            document.querySelectorAll('*').forEach(el => {
                el.style.animationDuration = '0.01ms';
                el.style.animationIterationCount = '1';
                el.style.transitionDuration = '0.01ms';
            });
        }

        // Add loading screen
        window.addEventListener('load', () => {
            const loader = document.createElement('div');
            loader.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(135deg, #667eea, #764ba2);
                display: flex; align-items: center; justify-content: center;
                z-index: 9999; transition: opacity 0.5s ease;
            `;
            loader.innerHTML = `
                <div style="text-align: center; color: white;">
                    <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); 
                         border-top: 3px solid white; border-radius: 50%; 
                         animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                    <div style="font-size: 1.2rem; font-weight: 600;">Chargement...</div>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            
            document.body.prepend(loader);
            
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 1500);
        });

        // Add scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 9999; transition: width 0.3s ease; width: 0%;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
