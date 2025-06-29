YummyYum - Online Restaurant Ordering System

A full-stack restaurant web application allowing users to view restaurant branches, add reviews, reserve a table,  browse menus, view food details  place orders, and pay online. Includes a robust admin dashboard for managing food items, categories, branches, and more.

✨ Features

🍽️ User Side

Browse food items by category

Add to cart, apply discount, and checkout

Payment via card (Stripe) or cash

Order success confirmation and invoice download

Mobile responsive design

📅 Admin Dashboard

Manage foods, categories, and branches

Add/edit/delete items with image upload

Track orders and generate invoices

Protected admin routes

🚀 Tech Stack

Frontend: React, Vite, Tailwind CSS, React Router

State & Data: React Query, Axios, Context API

Backend: Node.js, Express, MongoDB, Mongoose

Other: PDFKit, Stripe API, Toast Notifications

🔧 Installation Guide

Backend Setup

Navigate to server/

Run npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_url
STRIPE_SECRET=your_stripe_key
FRONTEND_URL=https://restaurant-yummy-yum.vercel.app

Run npm start


Frontend Setup

Navigate to client/

Run npm install

Create a .env file:

VITE_API_URL=https://yumyum-server-six.vercel.app

Run npm run dev


📱 Demo Access

🌐 Live Demo

User View

Admin Panel

🔑 Login Credentials

Admin Email: admin@example.com

Admin Password: 123456

User Email: user@example.com

User Password: 123456

🟯 Screenshots (see CodeCanyon upload)

Home page & category view

Food detail & cart

Checkout (cash/card)

Admin dashboard with food/branch control

Invoice PDF preview

✅ Notes

You must have a Stripe account for card payment.

Images and icons used are for demo purposes.

Fully documented and modular code for easy customization.

🌐 Contact & Support

If you face any issues or have questions, please contact via the profile support tab on CodeCanyon.

Thank you for choosing YummyYum! ✨