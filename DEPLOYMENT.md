# 🚀 Vercel Deployment Guide for Resume Builder

This repository is configured for seamless deployment on **Vercel**.

---

## 🎯 Option 1: Full-Stack Monorepo on Vercel (Fastest)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Connect your Git provider and select this repository.
   - Framework Preset: **Vite**
   - Root Directory: `./` (Leave as default root)

3. **Configure Environment Variables in Vercel Project Settings**:
   Under **Environment Variables**, add the following:

   | Key | Example Value | Description |
   | :--- | :--- | :--- |
   | `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/resume-builder?retryWrites=true&w=majority` | MongoDB Atlas Cloud Connection String |
   | `JWT_SECRET` | `your_super_secret_jwt_random_key_2026` | 32+ character random string |
   | `CLIENT_URL` | `https://your-project.vercel.app` | Your Vercel domain |
   | `GEMINI_API_KEY` | `AIzaSy...` | (Optional) For AI enhancements |
   | `SMTP_HOST` | `smtp.gmail.com` | (Optional) For live production emails |
   | `SMTP_PORT` | `587` | (Optional) |
   | `SMTP_USER` | `youremail@gmail.com` | (Optional) |
   | `SMTP_PASS` | `your_app_password` | (Optional) Google App Password |
   | `VITE_API_URL` | `/api` | Points frontend requests to Vercel `/api` |

4. **Click Deploy**!
   Vercel will build the frontend (`client/dist`) and deploy the backend as a Serverless Function (`api/index.js`).

---

## 🎯 Option 2: Decoupled Deployment (Industry Standard)

If you prefer deploying the React frontend and Node.js Express backend independently:

### A. Deploy Frontend on Vercel
1. In Vercel, click **Add New Project**.
2. Select your repository and set **Root Directory** to `client`.
3. Set Environment Variable:
   - `VITE_API_URL`: `https://your-backend-service.onrender.com/api`
4. Click **Deploy**.

### B. Deploy Backend on Render / Railway / Fly.io
1. Create a new **Web Service** on [Render.com](https://render.com) or [Railway.app](https://railway.app).
2. Set **Root Directory** to `server`.
3. Build Command: `npm install`
4. Start Command: `node src/server.js`
5. Add Environment Variables:
   - `MONGODB_URI`: `mongodb+srv://...`
   - `JWT_SECRET`: `your_random_secret`
   - `CLIENT_URL`: `https://your-frontend.vercel.app`
   - `NODE_ENV`: `production`

---

## ☁️ Setting up MongoDB Atlas (Free Cloud Database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account.
2. Create a free **M0 Shared Cluster**.
3. Under **Database Access**, create a user with username and password.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere).
5. Click **Connect** -> **Drivers (Node.js)** and copy your connection string:
   ```env
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/resume-builder?retryWrites=true&w=majority
   ```
