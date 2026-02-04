# Professional Portfolio Website

A modern, high-performance personal portfolio website built with React 19, optimized for SEO, AEO (Answer Engine Optimization), and 2026 best practices. Showcasing full-stack development expertise, AI/ML projects, and professional achievements.

**Live Demo:** [https://csharikrishna.vercel.app](https://csharikrishna.vercel.app)

![React](https://img.shields.io/badge/React-19.2.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.21-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)
![SEO](https://img.shields.io/badge/SEO-Optimized-brightgreen)

---

## Features

### Core Functionality
- Clean, professional UI with glassmorphism design
- Dark/Light theme with system preference detection
- Fully responsive across mobile, tablet, and desktop
- High performance with Vite and React 19 Hooks
- Functional contact form integration (EmailJS)
- Semantic HTML and ARIA accessibility standards

### Search Engine Optimization (SEO)
- JSON-LD structured data (Person, Organization, BreadcrumbList, FAQPage)
- XML sitemap with priority-based URL configuration
- robots.txt with crawl directives
- Meta tags optimization (canonical URL, Open Graph, Twitter Card)
- Semantic HTML structure for improved indexation

### Answer Engine Optimization (AEO)
- FAQ component with FAQPage JSON-LD schema
- AI-optimized content structure
- Project metadata for rich context
- Dublin Core metadata for content attribution

### Performance
- Lazy loading with React.lazy() and Suspense
- Intersection Observer for scroll animations
- CSS animations with reduced-motion support
- Battery-saver mode detection
- Resource hints (preconnect, preload, dns-prefetch)

### Accessibility
- Skip-to-main-content link
- Full keyboard navigation support
- ARIA labels and live regions
- Focus-visible indicators
- Reduced motion preference support

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | React 19.2.3, Vite 5.4.21 |
| **Styling** | CSS3, CSS Custom Properties, Framer Motion |
| **Icons** | React Icons 4.12.0 |
| **Animations** | Framer Motion 12.23.26 |
| **Contact Form** | EmailJS 3.11.0 |
| **Deployment** | Vercel |

---

## Project Structure

```
portfolio-website/
├── public/
│   ├── icon2.png            # Favicon
│   ├── sitemap.xml          # XML sitemap
│   └── robots.txt           # Crawler directives
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Navigation with scroll effects
│   │   ├── Hero.jsx         # Landing section
│   │   ├── About.jsx        # Professional background
│   │   ├── Skills.jsx       # Technical skills
│   │   ├── Experience.jsx   # Work history
│   │   ├── Projects.jsx     # Portfolio projects
│   │   ├── Education.jsx    # Educational background
│   │   ├── Achievements.jsx # Awards and recognitions
│   │   ├── FAQ.jsx          # Frequently asked questions
│   │   ├── Contact.jsx      # Contact form
│   │   ├── Footer.jsx       # Footer section
│   │   ├── ErrorBoundary.jsx
│   │   └── ui/
│   │       ├── Cursor.jsx       # Custom cursor
│   │       ├── ThemeToggle.jsx  # Dark/Light mode
│   │       ├── ScrollProgress.jsx
│   │       ├── SectionReveal.jsx
│   │       └── Loading.jsx
│   ├── hooks/
│   │   └── useCustomHooks.js    # Reusable React hooks
│   ├── styles/                  # Component CSS files
│   ├── App.jsx
│   └── index.jsx
├── .env.example             # Environment template
├── index.html               # Entry HTML with SEO meta
├── vite.config.js           # Vite configuration
├── vercel.json              # Deployment config
├── eslint.config.js         # ESLint configuration
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+ (v22 recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/csharikrishna/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your EmailJS credentials to .env
```

### Development

```bash
npm start
```
Opens at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
npm run preview  # Preview at http://localhost:4173
```

---

## Environment Variables

Create a `.env` file with:

```bash
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Get credentials from [EmailJS](https://www.emailjs.com/).

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy automatically on every push to `main`

### Security Headers

Configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (no geolocation, microphone, camera)

---

## Custom Hooks

Located in `src/hooks/useCustomHooks.js`:

| Hook | Purpose |
|------|---------|
| `useReducedMotionPreference` | Detect reduced motion preference |
| `useWindowSize` | Track viewport dimensions |
| `useIsMobile` | Mobile device detection |
| `useScrollPosition` | Current scroll position |
| `useScrollVelocity` | Scroll speed detection |
| `useIsInViewport` | Element visibility detection |
| `useTouchDevice` | Touch capability detection |
| `useDebouncedValue` | Debounced state values |
| `useBatterySaverMode` | Low power mode detection |

---

## Customization

| Section | File | Updates |
|---------|------|---------|
| Hero | `src/components/Hero.jsx` | Name, role, intro |
| About | `src/components/About.jsx` | Bio, expertise |
| Skills | `src/components/Skills.jsx` | Technical skills |
| Experience | `src/components/Experience.jsx` | Work history |
| Projects | `src/components/Projects.jsx` | Portfolio items |
| Education | `src/components/Education.jsx` | Degrees |
| Contact | `src/components/Contact.jsx` | Contact info |
| FAQ | `src/components/FAQ.jsx` | Q&A content |
| SEO | `index.html` | Meta tags, JSON-LD |

---

## Performance Targets

- **Lighthouse Performance:** 90+
- **Accessibility:** 95+
- **SEO:** 100
- **Best Practices:** 95+

---

## Author

**Chinnapattu S Hari Krishna**

- Portfolio: [csharikrishna.vercel.app](https://csharikrishna.vercel.app)
- GitHub: [@csharikrishna](https://github.com/csharikrishna)
- LinkedIn: [cs-harikrishna](https://linkedin.com/in/cs-harikrishna)
- Email: csharikrishna1806@gmail.com

---

## License

MIT License - See LICENSE file for details.

---

**Last Updated:** February 2026 | **Status:** Production Ready