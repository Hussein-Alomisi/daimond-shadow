# 🏗️ جوهرة الظل للمقاولات العامة

> Premium Corporate Construction Website & Management System

## 🌟 Overview

Tashyed Alqwa is a full-stack, state-of-the-art corporate web application tailored for a high-end construction company. Combining a breathtaking, modern user interface with a robust, scalable backend architecture, this platform serves as both a visually stunning public portfolio and an internal administrative powerhouse.

Engineered with a focus on SEO, performance, and aesthetic excellence, the system leverages a modern Next.js ecosystem to deliver a seamless experience for both clients and site administrators.

---

## ✨ Features

### 🏢 Public Website
- **Hero Section:** High-impact, visually dynamic introduction designed to capture attention immediately.
- **Projects Showcase:** An elegant, responsive gallery displaying completed construction projects.
- **Services:** Clear, professional breakdown of construction and engineering services offered.
- **Fields (Dynamic Pages):** Specialized sub-pages detailing specific areas of expertise (e.g., commercial, residential), driven by dynamic routing.
- **Contact Form:** Integrated lead-generation form allowing prospective clients to request quotes and consultations effortlessly.

### ⚙️ Admin Dashboard (CMS)
A fully authenticated, intuitive control panel built specifically to manage the entire platform. **This dashboard is a core feature**, empowering administrators with complete autonomy:
- **Manage Projects:** Full CRUD capabilities for the projects showcase.
- **Manage Services:** Add, edit, or remove company services on the fly.
- **Manage Fields:** Dynamic fields management featuring integrated image gallery controls.
- **Manage Hero Section:** Real-time updates to the homepage hero title, subtitle, and background imagery without touching code.
- **Manage Contact Info:** Centralized control over company contact details displayed across the site.
- **View Quote Requests:** Secure, read-only access to customer inquiries submitted via the public contact form.

---

## 🛠️ Tech Stack

- **Next.js 16 (App Router)**
- **React 19**
- **Tailwind CSS v4**
- **Prisma ORM**
- **MySQL**

---

## 🏛️ Architecture

The project adheres to Clean Architecture principles to ensure scalability, testability, and maintainability.

- **App Router Structure:** Utilizes the latest Next.js 16 conventions for server-side rendering, static generation, and efficient API routing.
- **Layered Design:** The backend data flow is strictly organized into layers: `API → Service → Repository → Prisma`. This separation of concerns ensures that business logic remains independent of the database and external frameworks.

---

## 📂 Project Structure

```text
.
├── app/            # Next.js App Router: Pages, layouts, and API routes
├── components/     # Reusable React components (UI elements, forms, layouts)
├── server/         # Core business logic, services, and repository layers
├── lib/            # Utility functions, Prisma client initialization, and helpers
└── types/          # TypeScript interfaces and data models
```

---

## 📸 Screenshots

### Homepage
![Homepage Screenshot](/placeholder-homepage.png)
*Modern, high-performance landing page designed for conversion and visual impact.*

### Admin Dashboard
![Dashboard Screenshot](/placeholder-dashboard.png)
*Comprehensive content management system for seamless internal operations.*

---




## 👨‍💻 Author

**[Hussein Alomisi]**  
*Software Developer*
