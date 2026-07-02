# Deployment & Hosting Guide

This guide explains how to make this E-Commerce Store live. The application contains a **Next.js frontend** and an **Express/Node.js backend** with a **MongoDB database**.

---

## 🚀 Recommended Approach: Serverless/Static Frontend on GitHub Pages (No Vercel Needed)

Since the frontend is designed with demo-mode fallbacks (including predefined catalogs, cart support, and admin mock controls running in `localStorage`), it can be hosted entirely on **GitHub Pages** for free.

### How to Make it Live on GitHub Pages:
1. Go to your repository on GitHub: [joel9946/ecommerce-website](https://github.com/joel9946/ecommerce-website).
2. Go to **Settings** -> **Pages** (in the sidebar under the "Code and automation" section).
3. Under **Build and deployment** -> **Source**, change the dropdown from "Deploy from a branch" to **GitHub Actions**.
4. Click on the **Actions** tab at the top of your repository. You will see a workflow named `Deploy Next.js to GitHub Pages` running.
5. Once the build and deployment jobs complete successfully, GitHub will display your live URL on the page.
6. Your live website link will be:
   👉 **`https://joel9946.github.io/ecommerce-website/`**

---

## 🛠️ Full-Stack Approach: Real Database (Express Server + MongoDB)

If you decide in the future that you want a live database and Express server instead of the static demo, follow these steps:

### Step 1: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Create a **New Cluster** using the **Shared (Free)** tier.
3. Go to **Database Access**: Click **Add New Database User** and set a username/password.
4. Go to **Network Access**: Click **Add IP Address** and choose **Allow Access From Anywhere (0.0.0.0/0)**.
5. Click **Connect** on your cluster -> **Connect your application** -> Copy the connection string. Replace `<password>` with your user's password.

### Step 2: Backend Deployment (Render)

Render is a popular platform to host Node.js servers for free.

1. Sign up/log in at [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your `ecommerce-website` repository.
4. Configure the Web Service settings:
   - **Root Directory**: `backend`
   - **Language**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Under **Environment Variables**, add:
   - `MONGO_URI`: `mongodb+srv://...` (your MongoDB Atlas connection string)
   - `JWT_SECRET`: `your_jwt_secret_string` (any random text)
6. Click **Create Web Service**. Wait until it is "Live", and copy your backend URL (e.g. `https://ecommerce-backend.onrender.com`).

### Step 3: Frontend Deployment (Vercel)

If you transition from GitHub Pages to Vercel for full-stack API integration:

1. Log in to [Vercel](https://vercel.com/) with GitHub.
2. Import the `ecommerce-website` repository.
3. Set the **Root Directory** to `frontend`.
4. Open the **Environment Variables** section and add:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend.onrender.com/api` (your hosted Render backend URL with `/api` at the end)
5. Click **Deploy**.
