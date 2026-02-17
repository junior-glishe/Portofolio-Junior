        // Initialiser (Animations on Scroll)
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        window.addEventListener('load', function() {
            const loader = document.getElementById('loader');
            loader.style.transition = 'opacity 0.1s ease'; // fondu très rapide
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 100); 
        });
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('animate-slide-up');
        });
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        if (localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (isDark) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                if (targetWidth && !bar.classList.contains('animated')) {
                    bar.style.setProperty('--target-width', targetWidth);
                    bar.classList.add('animated');
                    
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                }
            });
        }
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        const filterButtons = document.querySelectorAll('[data-filter]');
        const projectCards = document.querySelectorAll('.project-card');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove('active-filter', 'bg-primary-100', 'dark:bg-primary-900/30', 'text-primary-800', 'dark:text-primary-300');
                    btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-800', 'dark:text-gray-300');
                });
                button.classList.add('active-filter');
                button.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-800', 'dark:text-gray-300');
                button.classList.add('bg-primary-100', 'dark:bg-primary-900/30', 'text-primary-800', 'dark:text-primary-300');
                const filter = button.getAttribute('data-filter');
                projectCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                console.log('Formulaire soumis:', { name, email, subject, message });
                successMessage.classList.remove('hidden');
                successMessage.classList.add('animate-fade-in');
                contactForm.reset();
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    successMessage.classList.remove('animate-fade-in');
                }, 5000);
            });
        }
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
            });
        }
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        document.addEventListener('DOMContentLoaded', () => {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                skillObserver.observe(skillsSection);
            }
            const statsSection = document.querySelector('.stats-container');
            if (statsSection) {
                counterObserver.observe(statsSection);
            }
            document.querySelectorAll('#mobileMenu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        mobileMenu.classList.add('hidden');

                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            document.getElementById('currentYear').textContent = new Date().getFullYear();
        });
        window.addEventListener('scroll', () => {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                const rect = skillsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    setTimeout(animateSkillBars, 300);
                }
            }
        });
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && 
                !mobileMenuButton.contains(e.target) && 
                !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });

 document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de Swiper
    const swiper = new Swiper('.project-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      on: {
        init: function () {
          // Réappliquer AOS si nécessaire (optionnel)
        }
      }
    });

    // Gestion des filtres
    const filterButtons = document.querySelectorAll('[data-filter]');
    const slides = document.querySelectorAll('.swiper-slide');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');

        // Mise à jour de l'apparence des boutons
        filterButtons.forEach(btn => {
          btn.classList.remove('bg-primary-100', 'dark:bg-primary-900/30', 'text-primary-800', 'dark:text-primary-300', 'active-filter');
          btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-800', 'dark:text-gray-300');
        });
        this.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-800', 'dark:text-gray-300');
        this.classList.add('bg-primary-100', 'dark:bg-primary-900/30', 'text-primary-800', 'dark:text-primary-300', 'active-filter');

        // Filtrer les slides
        slides.forEach(slide => {
          const category = slide.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            slide.style.display = 'block'; // ou '' selon le style par défaut
          } else {
            slide.style.display = 'none';
          }
        });

        // Mettre à jour Swiper après filtrage
        swiper.update(); // recalcul de la disposition
        swiper.slideTo(0); // revenir au début
      });
    });
  });
swiper = new Swiper('.project-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: false,
  speed: 300,                // ← transition rapide (0.3s)
  autoplay: {
    delay: 3000,              // ← change de slide toutes les 3s
    disableOnInteraction: false, // ← continue après interaction manuelle
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
