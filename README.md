# Sinan K - Portfolio Website

A modern, responsive portfolio website showcasing skills, projects, and professional experience. Built with HTML5, CSS3, and vanilla JavaScript with enhanced UI/UX features.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: 
  - Dynamic project gallery
  - Live weather widget
  - Dev.to articles integration
  - Smooth scrolling navigation
- **Modern UI/UX**:
  - Custom animations and transitions
  - Gradient backgrounds and text effects
  - Hover effects and micro-interactions
  - Loading states and notifications
- **Performance Optimized**:
  - External CSS and JavaScript files
  - Debounced scroll events
  - Efficient DOM manipulation
  - Modular code structure

## 📁 Project Structure

```
Sinnu/
├── css/
│   └── style.css          # Custom styles and animations
├── js/
│   └── script.js          # Interactive functionality
├── sinnu.html             # Main HTML file
├── package.json           # Project configuration
└── README.md              # Project documentation
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (optional, for development server)
- Python (for basic HTTP server)
- Modern web browser

### Installation

1. **Clone or download the project**
   ```bash
   git clone https://github.com/your-username/sinan-k-portfolio.git
   cd sinan-k-portfolio
   ```

2. **Start the development server**

   **Option 1: Using Python (built-in)**
   ```bash
   python -m http.server 8000
   ```

   **Option 2: Using Node.js**
   ```bash
   npm install
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000/sinnu.html`

## 🔧 Configuration

### Weather API Setup
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `js/script.js`
3. Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key

### Dev.to Integration
1. Open `js/script.js`
2. Replace `gemini-code-assist` with your Dev.to username in the `CONFIG` object

### Social Media Links
Update the social media links in `sinnu.html`:
- GitHub profile URL
- LinkedIn profile URL

## 🎨 Customization

### Colors and Themes
The color scheme can be customized in `css/style.css`:
- Primary colors: Blue gradient (`#3b82f6` to `#1d4ed8`)
- Background: Dark gray (`#1f2937`)
- Text: Light gray (`#d1d5db`)

### Animations
Custom animations are defined in `css/style.css`:
- `fadeInUp`: Elements fade in from bottom
- `slideInLeft`: Elements slide in from left
- `slideInRight`: Elements slide in from right

### Adding Projects
To add new projects to the gallery:
1. Add a new thumbnail div in the projects section
2. Include `data-title`, `data-description`, and `data-image` attributes
3. Add the corresponding image

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the project folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployment on every push

### Vercel
1. Import your GitHub repository
2. Vercel will automatically detect it as a static site
3. Deploy with one click

## 🔍 Performance Tips

- Images are optimized for web
- CSS and JavaScript are minified for production
- External libraries are loaded via CDN
- Lazy loading for images (can be implemented)
- Service worker for caching (can be added)

## 🐛 Troubleshooting

### Weather Widget Not Working
- Check if API key is correctly set
- Verify internet connection
- Check browser console for errors

### Articles Not Loading
- Verify Dev.to username is correct
- Check if the user has published articles
- Network connectivity issues

### Styling Issues
- Clear browser cache
- Check if CSS file is loading correctly
- Verify Tailwind CSS CDN is accessible

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- **Name**: Sinan K
- **Email**: [your-email@example.com]
- **LinkedIn**: [your-linkedin-profile]
- **GitHub**: [your-github-profile]

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [Inter Font](https://rsms.me/inter/) for typography
- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Dev.to](https://dev.to/) for articles integration
- [Google Fonts](https://fonts.google.com/) for web fonts

---

**Note**: This is a static website. For production use, consider adding a backend for the contact form and implementing proper security measures. 