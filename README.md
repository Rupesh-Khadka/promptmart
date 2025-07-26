# 🧠 AI Prompt Marketplace

A modern, scalable AI prompt marketplace where users can create shops, buy/sell AI prompts, withdraw earnings, and deploy their own AI chatbots. Built with a powerful tech stack and designed for performance and flexibility.

---

## 🚀 Features

### 🏪 Marketplace
- Create your own **AI Prompt Shop**
- Buy and sell prompts with **real-time online payments**
- Fully managed **withdrawal system** for sellers
- Individual **shop dashboards** and **admin panels**

### 🤖 AI Prompt Chatbot
- Embed customizable **AI prompt bots** on your website
- Real-time chat powered by **Socket.io**
- Easy integration with embeddable widgets

### 📬 Notifications
- Instant **email notifications** for purchases, messages, and system events
- Real-time alerts using **WebSockets**

### 🔐 Authentication
- Secure **OAuth 2.0 login** (Google, GitHub, etc.)
- Session management with **JWT or cookie-based auth**

---

## ⚙️ Tech Stack

| Technology       | Purpose                                  |
|------------------|------------------------------------------|
| **Next.js**      | Full-stack React framework               |
| **TypeScript**   | Safer development with static typing     |
| **Prisma**       | ORM to interact with PostgreSQL          |
| **PostgreSQL**   | Scalable and reliable relational DB      |
| **Redis**        | Caching, real-time pub/sub communication |
| **Stripe**       | Online payments and withdrawals          |
| **AWS S3**       | File/image upload and secure storage     |
| **Socket.io**    | Real-time communication                  |

---

## 📊 Dashboards

- **Admin Dashboard** – Manage users, shops, and transactions
- **Shop Owner Dashboard** – Upload prompts, view sales, manage chatbots
- **Customer Dashboard** – Track purchases and chat interactions

---

## 💡 How It Works

1. **User Authentication** via OAuth
2. **Create Shops** and upload AI prompts
3. **Customers purchase** prompts using Stripe
4. **Download access** is granted instantly
5. **Sellers withdraw** their earnings securely
6. **AI prompt bots** can be embedded into external websites

---

## 🐳 Docker Deployment with AWS ECR + ECS

### 🧰 Prerequisites
- AWS CLI configured
- Docker installed
- ECR repository created
- ECS cluster and task definition setup

### 1. Build Docker Image

```bash
docker build -t ai-prompt-marketplace .
