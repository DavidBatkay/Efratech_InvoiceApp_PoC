# 🧾 Invoice Management App (PoC)

A full-stack **Invoice Management Web Application** developed as a **Proof of Concept** (PoC) for an apprenticeship opportunity. This project showcases my ability to build a complete CRUD application using modern web development tools, with features that cover real-world business needs like client management, invoicing, payments, filtering, and dashboard analytics.

---

## 🚀 Purpose of the Project

This project was built as part of my **apprenticeship**. It demonstrates not only technical implementation but also design decisions, clean architecture, scalability, and user-centered functionality.

It highlights:

- A working backend and frontend integration
- Use of modern tools and libraries
- Practical use of authentication, state management, and database relations
- Real-world invoice handling including statuses like PENDING, PAID, OVERDUE
- Clean and responsive UI

---

## 🛠️ Tech Stack

### 🔧 Backend

- **Next.js (App Router)** – SSR frontend + API endpoints
- **Prisma ORM** – Type-safe database queries
- **PostgreSQL** – Relational database
- **NextAuth** – Authentication using JWT & PrismaAdapter

### 🎨 Frontend

- **React** with **TailwindCSS** – Responsive UI
- **Shadcn/UI** – Component library for sleek components

### 🧰 Other Tools

- **TypeScript** – Static typing
- **Framer Motion** – Subtle UI animations

---

## 📦 Features

### ✅ Core Features

- Create, Read, Update, and Delete invoices
- Form validations with visual feedback
- Filter invoices by status (Pending, Paid, Overdue, Archived)
- View individual invoice details
- Add line items with quantity & pricing
- Automatically calculate total invoice value

### 👥 Users

- Authentication using email/password
- Each user sees only their own invoices
- Username displayed on dashboard

### 🧑‍💼 Customers

- Add and manage customers
- Invoices reference customer data instead of plain company names
- Select customers from a dropdown in invoice form

### 💳 Payments

- Mark invoices as paid
- Payments stored as a separate entity
- Payment sorting

### 📊 Dashboard

- Overview stats for total invoices, revenue, pending payments, etc.
- Compact animated widgets

---
