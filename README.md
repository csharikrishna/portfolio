# Professional Portfolio Website

A modern, responsive personal portfolio website built with React, showcasing my skills, projects, experience, and achievements as a Computer Science Engineering student and Full-Stack Developer.

Live Demo: [https://csharikrishna.vercel.app](https://csharikrishna.vercel.app)

![React](https://img.shields.io/badge/React-18-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)
![EmailJS](https://img.shields.io/badge/EmailJS-Contact%20Form-green)

---

## Features

- Clean and professional UI with solid colors and strong typography
- Fully responsive design (mobile and desktop)
- Fast performance with React hooks and functional components
- Functional contact form powered by EmailJS
- Secure environment variable configuration
- Continuous deployment via Vercel
- Semantic HTML and accessible components

---

## Tech Stack

- Frontend: React 18, JavaScript (ES6+), HTML5, CSS3
- Styling: Custom CSS (modular per component)
- Icons: React Icons
- Email Service: EmailJS (@emailjs/browser)
- Deployment: Vercel
- Version Control: Git and GitHub

---

## Project Structure

```
portfolio-website/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Education.jsx
│   │   ├── Achievements.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Hero.css
│   │   ├── About.css
│   │   ├── Skills.css
│   │   ├── Experience.css
│   │   ├── Projects.css
│   │   ├── Education.css
│   │   ├── Achievements.css
│   │   ├── Contact.css
│   │   └── Footer.css
│   ├── App.jsx
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/csharikrishna/portfolio.git
cd portfolio
```

**2. Install dependencies**

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Important: Make sure `.env` is added to `.gitignore` (it should be by default in Create React App).

Get your credentials from EmailJS: https://www.emailjs.com/

### Run Locally

```bash
npm start
```

Visit http://localhost:3000

Hot reload is enabled—changes in components and styles will update automatically.

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

---

## EmailJS Setup

The contact form uses EmailJS to send messages directly from the frontend.

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up and verify your email
3. Connect an email service (Gmail, Outlook, etc.)

### Step 2: Create Email Template

Create a template with the following variables:
- user_name
- user_email
- subject
- message

Example template body:
```
From: {{user_name}} ({{user_email}})
Subject: {{subject}}
Message: {{message}}
```

### Step 3: Configure Environment Variables

Add your EmailJS credentials to the `.env` file:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

The `Contact.jsx` component reads these variables and sends the form data using `emailjs.sendForm()`.

---

## Deployment (Vercel)

### One-Time Setup

1. Push code to GitHub
2. Go to https://vercel.com/ and import your repository
3. Vercel auto-detects:
   - Build Command: `npm run build`
   - Output Directory: `build`

### Add Environment Variables

1. In your Vercel project dashboard, go to Settings and then Environment Variables
2. Add your EmailJS credentials:
   - REACT_APP_EMAILJS_SERVICE_ID
   - REACT_APP_EMAILJS_TEMPLATE_ID
   - REACT_APP_EMAILJS_PUBLIC_KEY
3. Redeploy the project for variables to take effect

### Auto-Deployments

Every push to the `main` branch automatically deploys to production:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

---

## Customization

Update your personal information in these files:

- Hero.jsx - Name, role, introduction, and CTA buttons
- About.jsx - Bio, interests, location, and languages
- Skills.jsx - Technical skills by category
- Experience.jsx - Work experience and certifications
- Projects.jsx - Portfolio projects with descriptions
- Education.jsx - Educational background
- Achievements.jsx - Awards and recognitions
- Contact.jsx - Email, phone, location, and social links

Modify colors, spacing, and typography in `src/styles/` directory.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| npm start | Run development server at http://localhost:3000 |
| npm run build | Build optimized production bundle |
| npm test | Run tests (if configured) |
| npm run eject | Eject from Create React App (irreversible) |

---

## License

MIT License - feel free to use this template for your portfolio!

---

## Author

Chinnapattu S Hari Krishna

- GitHub: https://github.com/csharikrishna
- LinkedIn: https://linkedin.com/in/cs-harikrishna
- Email: csharikrishna1806@gmail.com

---

## Acknowledgments

- Built with Create React App (https://create-react-app.dev/)
- Icons from React Icons (https://react-icons.github.io/react-icons/)
- Email service by EmailJS (https://www.emailjs.com/)