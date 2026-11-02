# BrixtinStudioX

A marketing site for BrixtinStudioX, a design and engineering studio. It has a 3D hero, smooth scrolling, scroll-driven reveals and a working contact form.

## Features

- 3D hero built with React Three Fiber and drei
- Smooth scrolling with Lenis, plus parallax and text reveal effects with Framer Motion
- Sections for services, work, process, pricing, testimonials and FAQ
- Project detail pages with React Router
- Contact form and file upload component, with email delivery through EmailJS

## Stack

React, Vite, Three.js, React Three Fiber, Framer Motion, Lenis, React Router, EmailJS

## Run it locally

```bash
npm install
npm run dev
```

To make the contact form send email, follow [SETUP_GUIDE.md](SETUP_GUIDE.md) and add your EmailJS IDs to `src/components/Contact.jsx`.
