// ===================================================
//  Sinan K Portfolio — script.js
//  Fully updated: new projects, weather, articles
// ===================================================

const CONFIG = {
    weatherApiKey: 'a0d8c2864a437a7d9676476b6c711d20',
    articlesToShow: 5,
    devToTag: 'ai'
};

// ===== UTILITY =====
const Utils = {
    debounce(fn, wait) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
    },

    notify(message, type = 'info') {
        const n = document.createElement('div');
        n.className = `notification ${type}`;
        const icons = { success: '✓', error: '✕', info: 'ℹ' };
        n.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
        document.body.appendChild(n);
        setTimeout(() => {
            n.style.opacity = '0';
            n.style.transform = 'translateX(100%)';
            n.style.transition = 'all 0.3s';
            setTimeout(() => n.remove(), 300);
        }, 3500);
    }
};

// ===== PARTICLES =====
const Particles = {
    init() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let W, H;

        const resize = () => {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const count = Math.min(60, Math.floor(window.innerWidth / 22));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.5 + 0.3,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.5 + 0.1
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            // Draw dots
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
                ctx.fill();
            });
            requestAnimationFrame(draw);
        };
        draw();
    }
};

// ===== HEADER & NAV =====
const Navigation = {
    init() {
        // Mobile menu
        const hamburger = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn   = document.getElementById('close-mobile-menu');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
        }
        if (closeBtn && mobileMenu) {
            closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
        }
        // Close on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                const id = link.getAttribute('href').slice(1);
                const el = document.getElementById(id);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Active nav + scroll progress
        window.addEventListener('scroll', Utils.debounce(Navigation.onScroll, 50));
        Navigation.onScroll();
    },

    onScroll() {
        const scrollTop  = window.scrollY;
        const docHeight  = document.body.scrollHeight - window.innerHeight;
        const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        const bar        = document.getElementById('scroll-progress');
        if (bar) bar.style.width = pct + '%';

        // Active section
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.desktop-nav a');
        let current = '';
        sections.forEach(s => {
            if (scrollTop >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
        });
    }
};

// ===== GREETING =====
const Greeting = {
    init() {
        const h = new Date().getHours();
        const msg = h < 5 ? 'Good night' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
        const el = document.getElementById('greeting');
        if (el) el.textContent = `${msg}, I'm Sinan K.`;
    }
};

// ===== PROJECT GALLERY =====
const ProjectGallery = {
    init() {
        const thumbs = document.querySelectorAll('.project-thumb');
        if (!thumbs.length) return;

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                ProjectGallery.update(thumb);
            });
        });

        // Load the first project
        ProjectGallery.update(thumbs[0]);
    },

    update(thumb) {
        const display = document.getElementById('main-project-display');
        if (!display) return;

        // Fade out
        display.style.opacity = '0';
        display.style.transform = 'scale(0.97)';
        display.style.transition = 'all 0.2s';

        setTimeout(() => {
            const imgEl    = document.getElementById('main-project-image');
            const titleEl  = document.getElementById('main-project-title');
            const descEl   = document.getElementById('main-project-description');
            const techEl   = document.getElementById('main-project-tech');
            const tagEl    = document.getElementById('main-project-tag');
            const ghBtn    = document.getElementById('main-project-github');

            const { title, description, image, github, tech, tag } = thumb.dataset;

            if (imgEl)   imgEl.src   = image   || '';
            if (titleEl) { titleEl.textContent = title || ''; titleEl.href = github || '#'; }
            if (descEl)  descEl.textContent  = description || '';
            if (tagEl)   tagEl.textContent   = tag   || '';

            // Tech pills
            if (techEl && tech) {
                techEl.innerHTML = tech.split(',').map(t =>
                    `<span class="tech-pill">${t.trim()}</span>`
                ).join('');
            }

            // GitHub button
            if (ghBtn) {
                if (github && github !== '#') {
                    ghBtn.href = github;
                    ghBtn.style.display = 'inline-flex';
                } else {
                    ghBtn.style.display = 'none';
                }
            }

            // Fade in
            display.style.opacity = '1';
            display.style.transform = 'scale(1)';
        }, 200);
    }
};

// ===== DEV.TO ARTICLES =====
const DevToArticles = {
    async init() {
        const list = document.getElementById('dev-articles');
        if (!list) return;

        try {
            const res = await fetch(`https://dev.to/api/articles?tag=${CONFIG.devToTag}&per_page=10`);
            if (!res.ok) throw new Error('Failed to fetch');
            const articles = await res.json();
            DevToArticles.render(articles.slice(0, CONFIG.articlesToShow));
        } catch (e) {
            if (list) list.innerHTML = '<li style="text-align:center;color:var(--text-muted);padding:2rem;">Could not load articles right now.</li>';
        }
    },

    render(articles) {
        const list = document.getElementById('dev-articles');
        if (!list) return;

        if (!articles.length) {
            list.innerHTML = '<li style="text-align:center;color:var(--text-muted);padding:2rem;">No articles found.</li>';
            return;
        }

        list.innerHTML = articles.map((a, i) => `
            <li class="reveal" style="transition-delay:${i * 80}ms">
                <a href="${a.url}" target="_blank" rel="noopener"
                   style="display:flex;gap:1rem;align-items:flex-start;padding:1rem 1.25rem;
                          background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);
                          transition:border-color 0.2s,transform 0.2s;text-decoration:none;"
                   onmouseover="this.style.borderColor='var(--border-glow)';this.style.transform='translateY(-2px)'"
                   onmouseout="this.style.borderColor='var(--border)';this.style.transform=''">
                    ${a.cover_image ? `<img src="${a.cover_image}" alt="" style="width:80px;height:56px;object-fit:cover;border-radius:6px;flex-shrink:0;">` : ''}
                    <div style="flex:1;min-width:0">
                        <h4 style="font-weight:600;color:var(--text);font-size:0.9rem;line-height:1.4;margin-bottom:0.3rem">${a.title}</h4>
                        <p style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
                            ${a.description || ''}
                        </p>
                        <div style="display:flex;gap:1rem;margin-top:0.4rem;font-size:0.72rem;color:var(--text-muted)">
                            <span>${new Date(a.published_at).toLocaleDateString('en-IN', {month:'short',day:'numeric',year:'numeric'})}</span>
                            <span>·</span>
                            <span>${a.reading_time_minutes} min read</span>
                            <span>·</span>
                            <span style="color:var(--accent)">${a.tag_list?.slice(0,2).join(', ') || ''}</span>
                        </div>
                    </div>
                </a>
            </li>
        `).join('');

        ScrollReveal.observe();
    }
};

// ===== WEATHER =====
const Weather = {
    init() {
        const searchBtn = document.getElementById('search-btn');
        const cityInput = document.getElementById('city-input');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const city = cityInput?.value.trim();
                if (city) Weather.fetch(city);
                else Utils.notify('Please enter a city name.', 'error');
            });
        }

        if (cityInput) {
            cityInput.addEventListener('keypress', e => {
                if (e.key === 'Enter') searchBtn?.click();
            });
        }

        // Quick city buttons
        document.querySelectorAll('.quick-city-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const city = btn.dataset.city;
                if (cityInput) cityInput.value = city;
                Weather.fetch(city);
            });
        });

        // Default load
        Weather.fetch('Kochi');
    },

    async fetch(city) {
        const container = document.getElementById('weather-inf');
        if (!container) return;

        container.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;padding:2rem;color:var(--text-muted)">
                <div class="loading-spinner"></div>
                <span>Fetching weather for ${city}…</span>
            </div>`;

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${CONFIG.weatherApiKey}&units=metric`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('City not found');
            const data = await res.json();
            Weather.render(data);
        } catch (err) {
            container.innerHTML = `<p style="text-align:center;color:var(--error);padding:2rem;">${err.message}</p>`;
        }
    },

    render(data) {
        const container = document.getElementById('weather-inf');
        if (!container) return;

        const { name, main, weather, wind } = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        container.innerHTML = `
            <div class="weather-card">
                <p class="weather-city-name">${name}</p>
                <div class="weather-main-row">
                    <img src="${icon}" alt="${weather[0].description}" class="weather-icon-img">
                    <p class="weather-temp">${Math.round(main.temp)}°C</p>
                </div>
                <p class="weather-desc">${weather[0].description}</p>
                <div class="weather-details-row">
                    <div class="weather-detail">
                        <span class="weather-detail-label">Humidity</span>
                        <span class="weather-detail-val">${main.humidity}%</span>
                    </div>
                    <div class="weather-detail">
                        <span class="weather-detail-label">Wind</span>
                        <span class="weather-detail-val">${wind.speed} m/s</span>
                    </div>
                    <div class="weather-detail">
                        <span class="weather-detail-label">Feels Like</span>
                        <span class="weather-detail-val">${Math.round(main.feels_like)}°C</span>
                    </div>
                    <div class="weather-detail">
                        <span class="weather-detail-label">Pressure</span>
                        <span class="weather-detail-val">${main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        `;
    }
};

// ===== CONTACT FORM =====
const ContactForm = {
    init() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        form.addEventListener('submit', ContactForm.onSubmit);
    },

    onSubmit(e) {
        e.preventDefault();
        const name    = e.target.name.value.trim();
        const email   = e.target.email.value.trim();
        const message = e.target.message.value.trim();

        if (!name || !email || !message) {
            Utils.notify('Please fill in all fields.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Utils.notify('Please enter a valid email address.', 'error');
            return;
        }

        const btn = e.target.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

        setTimeout(() => {
            Utils.notify('Message sent! I\'ll get back to you soon.', 'success');
            e.target.reset();
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        }, 1500);
    }
};

// ===== SCROLL REVEAL =====
const ScrollReveal = {
    observer: null,

    init() {
        ScrollReveal.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => {
            ScrollReveal.observer.observe(el);
        });
    },

    observe() {
        // Re-observe after dynamic content is added
        document.querySelectorAll('.reveal:not([data-observed])').forEach(el => {
            el.setAttribute('data-observed', '1');
            ScrollReveal.observer?.observe(el);
        });
    }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    Particles.init();
    Navigation.init();
    Greeting.init();
    ProjectGallery.init();
    DevToArticles.init();
    Weather.init();
    ContactForm.init();
    ScrollReveal.init();

    // Mark all existing reveal elements
    document.querySelectorAll('section, .exp-card, .cert-card, .skill-category-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 40}ms`;
    });
    ScrollReveal.observe();
});
