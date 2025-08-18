// JavaScript for Sinan K Portfolio
// Enhanced with better error handling, animations, and modular structure

// Configuration
const CONFIG = {
    weatherApiKey: 'a0d8c2864a437a7d9676476b6c711d20', // Replace with your actual API key
    devToUsername: 'gemini-code-assist', // Replace with your Dev.to username
    articlesToShow: 5,
    animationDelay: 100
};

// Utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Smooth scroll to element
    scrollToElement: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // Add animation classes to elements with corporate timing
    animateOnScroll: () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animations for a more corporate feel
                    setTimeout(() => {
                        entry.target.classList.add('animate-fade-in-up');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section, .corporate-card, .project-thumbnail').forEach((element, index) => {
            observer.observe(element);
        });
    },

    // Show corporate notification
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        const colors = {
            error: 'var(--error-red)',
            success: 'var(--success-green)',
            warning: 'var(--warning-orange)',
            info: 'var(--primary-blue)'
        };
        
        notification.className = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white animate-fade-in-up';
        notification.style.background = colors[type] || colors.info;
        notification.style.border = `1px solid ${colors[type] || colors.info}`;
        notification.style.backdropFilter = 'blur(10px)';
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <div class="w-2 h-2 rounded-full bg-white opacity-80"></div>
                <span class="font-medium">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate out
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
};

// Greeting functionality
const Greeting = {
    setGreeting: () => {
        const date = new Date();
        const hour = date.getHours();
        let greeting = "Good morning";
        
        if (hour >= 12 && hour < 17) {
            greeting = "Good afternoon";
        } else if (hour >= 17 || hour < 5) {
            greeting = "Good evening";
        }
        
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            greetingElement.innerText = `${greeting}, I'm Sinan K.`;
        }
    }
};

// Project Gallery functionality
// Project Gallery functionality
const ProjectGallery = {
    init: () => {
        // Set initial project display
        const initialThumbnail = document.querySelector('.project-thumbnail');
        if (initialThumbnail) {
            ProjectGallery.updateMainDisplay(initialThumbnail);
        }

        // Add click event listeners
        document.querySelectorAll('.project-thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                ProjectGallery.updateMainDisplay(thumbnail);
            });
        });
    },

    updateMainDisplay: (thumbnail) => {
        const title = thumbnail.dataset.title;
        const description = thumbnail.dataset.description;
        const image = thumbnail.dataset.image;
        const githubLink = thumbnail.dataset.github; // NEW: Get the GitHub link

        const mainTitleLink = document.getElementById('main-project-title'); // Changed to get the <a> tag
        const mainDescription = document.getElementById('main-project-description');
        const mainImage = document.getElementById('main-project-image');

        // Add corporate animation effect
        const mainDisplay = document.getElementById('main-project-display');
        if (mainDisplay) {
            mainDisplay.style.opacity = '0';
            mainDisplay.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                // NEW: Update the text content and href of the <a> tag
                if (mainTitleLink) {
                    mainTitleLink.textContent = title;
                    mainTitleLink.href = githubLink;
                }
                
                if (mainDescription) mainDescription.textContent = description;
                if (mainImage) mainImage.src = image;
                
                mainDisplay.style.opacity = '1';
                mainDisplay.style.transform = 'scale(1)';
            }, 200);
        }
    }
};
// Dev.to Articles functionality
const DevToArticles = {
    async fetchArticles() {
        const articlesList = document.getElementById('dev-articles');
        if (!articlesList) return;

        articlesList.innerHTML = '<li class="text-center text-gray-400"><div class="corporate-spinner mx-auto"></div> Fetching articles...</li>';

        const apiURL = `https://dev.to/api/articles?tag=ai&per_page=10`;

        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const articles = await response.json();
            
            DevToArticles.displayArticles(articles);
        } catch (error) {
            console.error('Error fetching Dev.to articles:', error);
            articlesList.innerHTML = '<li class="text-center text-red-400">Failed to load articles. Please try again later.</li>';
        }
    },

    displayArticles(articles) {
        const articlesList = document.getElementById('dev-articles');
        if (!articlesList) return;

        let articleHTML = '';
        if (articles.length === 0) {
            articleHTML = '<li class="text-center text-gray-400">No articles found.</li>';
        } else {
            for (let i = 0; i < Math.min(CONFIG.articlesToShow, articles.length); i++) {
                const article = articles[i];
                articleHTML += `
                    <li class="animate-fade-in-up" style="animation-delay: ${i * CONFIG.animationDelay}ms">
                        <a href="${article.url}" target="_blank" class="block p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 card-hover">
                            <h4 class="text-lg font-bold text-white">${article.title}</h4>
                            <p class="text-sm text-gray-400 mt-1">${article.description || 'No description available'}</p>
                            <div class="flex items-center mt-2 text-xs text-gray-500">
                                <span>${new Date(article.published_at).toLocaleDateString()}</span>
                                <span class="mx-2">•</span>
                                <span>${article.reading_time_minutes} min read</span>
                            </div>
                        </a>
                    </li>
                `;
            }
        }
        articlesList.innerHTML = articleHTML;
    }
};


const cityname="Kochi"


// Weather functionality


const Weather = {
    async getWeather(city) {
        const weatherInfo = document.getElementById('weather-inf');
        if (!weatherInfo) return;

        if (CONFIG.weatherApiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
            weatherInfo.innerHTML = '<p class="text-red-400">Please provide a valid OpenWeatherMap API key in the configuration.</p>';
            return;
        }

        weatherInfo.innerHTML = '<p class="text-gray-400"><div class="corporate-spinner mx-auto"></div> Fetching weather data...</p>';

        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG.weatherApiKey}&units=metric`;

        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('City not found or network error.');
            }
            const data = await response.json();
            
            Weather.displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = `<p class="text-red-400">${error.message}</p>`;
        }
    },

    displayWeather(data) {
        const weatherInfo = document.getElementById('weather-inf');
        if (!weatherInfo) return;

        const cityName = data.name;
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        weatherInfo.innerHTML = `
            <div class="weather-widget animate-fade-in-up">
                <div class="flex flex-col items-center">
                    <h3 class="text-2xl font-bold text-white mb-2">${cityName}</h3>
                    <div class="flex items-center mb-4">
                        <img src="${iconURL}" alt="${description}" class="weather-icon w-16 h-16">
                        <p class="text-4xl font-bold text-white ml-2">${temp}°C</p>
                    </div>
                    <p class="text-lg text-white capitalize mb-4">${description}</p>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="text-center">
                            <p class="text-gray-300">Humidity</p>
                            <p class="text-white font-semibold">${humidity}%</p>
                        </div>
                        <div class="text-center">
                            <p class="text-gray-300">Wind Speed</p>
                            <p class="text-white font-semibold">${windSpeed} m/s</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        const searchBtn = document.getElementById('search-btn');
        const cityInput = document.getElementById('city-input');
        
        // Add event listener for the search button
        if (searchBtn && cityInput) {
            searchBtn.addEventListener('click', () => {
                const cityName = cityInput.value.trim();
                if (cityName) {
                    this.getWeather(cityName);
                }
            });

            // Add event listener for the "Enter" key on the input field
            cityInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    searchBtn.click();
                }
            });
        }
    }
};

// Initialize the weather application
document.addEventListener('DOMContentLoaded', () => {
    Weather.init();
});
// Contact Form functionality
const ContactForm = {
    init() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', ContactForm.handleSubmit);
    },

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (name === '' || email === '' || message === '') {
            Utils.showNotification('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Utils.showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        ContactForm.showLoadingState(form);
        
        setTimeout(() => {
            Utils.showNotification('Message sent successfully! (Simulated)', 'success');
            form.reset();
            ContactForm.hideLoadingState(form);
        }, 2000);
    },

    showLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="corporate-spinner mx-auto"></div> Sending...';
        }
    },

    hideLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }
};

// Navigation functionality
const Navigation = {
    init() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                Utils.scrollToElement(targetId);
            });
        });

        // Active navigation highlighting
        Navigation.highlightActiveSection();
        window.addEventListener('scroll', Utils.debounce(Navigation.highlightActiveSection, 100));
    },

    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-blue-400', 'font-semibold');
            link.classList.add('text-gray-300');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-300');
                link.classList.add('text-blue-400', 'font-semibold');
            }
        });

        // Update progress bar if it exists
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Greeting.setGreeting();
    ProjectGallery.init();
    DevToArticles.fetchArticles();
    Weather.init();
    ContactForm.init();
    Navigation.init();
    Utils.animateOnScroll();

    // Add loading animation to page
    document.body.classList.add('animate-fade-in-up');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        Greeting,
        ProjectGallery,
        DevToArticles,
        Weather,
        ContactForm,
        Navigation
    };
} 