# 🚀 Free Deployment Guide - Passport Automation System

This guide will help you deploy your Passport Automation System completely free using:
- **Frontend**: Vercel or Netlify (Free)
- **Backend**: Render or Railway (Free tier)
- **Database**: MongoDB Atlas (Free M0 cluster)
- **File Storage**: Backend file system (or Cloudinary for production)

---

## 📋 Prerequisites

1. GitHub account (your code is already there!)
2. Email for signing up to hosting services
3. 15-20 minutes

---

## Step 1: Set Up MongoDB Atlas (Free Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new **FREE M0 cluster** (512MB storage)

### 1.2 Configure Database Access
1. Go to **Database Access** → **Add New Database User**
2. Create a username and password (save these!)
3. Set privileges to **Read and write to any database**

### 1.3 Configure Network Access
1. Go to **Network Access** → **Add IP Address**
2. Click **Allow Access from Anywhere** (or add specific IPs)
3. Click **Confirm**

### 1.4 Get Connection String
1. Go to **Clusters** → Click **Connect**
2. Choose **Connect your application**
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Replace `<password>` with your actual password
5. Add database name: `passport_automation`
6. **Full connection string example:**
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/passport_automation?retryWrites=true&w=majority
   ```
7. **Save this connection string!** You'll need it for backend deployment.

---

## Step 2: Deploy Backend (Render - Free)

### 2.1 Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

### 2.2 Deploy Backend Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `Karthikeyan1814/passport`
3. Configure the service:
   - **Name**: `passport-backend` (or any name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

### 2.3 Set Environment Variables
Click **Environment** tab and add:
- `MONGODB_URI`: Your MongoDB Atlas connection string from Step 1.4
- `PORT`: `10000` (Render sets this automatically, but good to have)
- `ALLOWED_ORIGINS`: `https://your-frontend-url.vercel.app` (update after frontend deployment)
- `JWT_SECRET`: Generate a random string (e.g., use [random.org](https://www.random.org/strings/))
- `NODE_ENV`: `production`

### 2.4 Deploy
1. Click **Create Web Service**
2. Wait 5-10 minutes for deployment
3. Copy your backend URL (e.g., `https://passport-backend.onrender.com`)
4. **Note**: Free tier services spin down after 15 minutes of inactivity. First request may take 30-60 seconds.

---

## Step 3: Deploy Frontend (Vercel - Free)

### 3.1 Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### 3.2 Deploy Frontend
1. Click **Add New Project**
2. Import your repository: `Karthikeyan1814/passport`
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3.3 Set Environment Variables
Click **Environment Variables** and add:
- `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://passport-backend.onrender.com`)

### 3.4 Deploy
1. Click **Deploy**
2. Wait 2-3 minutes
3. Copy your frontend URL (e.g., `https://passport-automation.vercel.app`)

### 3.5 Update Backend CORS
1. Go back to Render dashboard
2. Edit your backend service
3. Update `ALLOWED_ORIGINS` environment variable:
   - Add your Vercel frontend URL: `https://passport-automation.vercel.app`
   - Or use: `https://passport-automation.vercel.app,http://localhost:3000` (for local dev)
4. Save and redeploy

---

## Step 4: Alternative - Deploy Backend on Railway (Free)

### 4.1 Create Railway Account
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Get $5 free credit (enough for months of free hosting)

### 4.2 Deploy
1. Click **New Project** → **Deploy from GitHub repo**
2. Select your repository
3. Railway auto-detects Node.js
4. Set **Root Directory** to `backend`
5. Add environment variables (same as Render)
6. Deploy!

---

## Step 5: Alternative - Deploy Frontend on Netlify (Free)

### 5.1 Create Netlify Account
1. Go to [Netlify](https://netlify.com)
2. Sign up with GitHub

### 5.2 Deploy
1. Click **Add new site** → **Import an existing project**
2. Connect GitHub repository
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL
5. Deploy!

---

## 🔧 Troubleshooting

### Backend Issues
- **"MongoDB connection error"**: Check your `MONGODB_URI` environment variable
- **"CORS error"**: Update `ALLOWED_ORIGINS` with your frontend URL
- **"Service unavailable"**: Free tier services spin down after inactivity. First request may be slow.

### Frontend Issues
- **"API calls failing"**: Check `REACT_APP_API_URL` environment variable
- **"Build failed"**: Make sure all dependencies are in `package.json`

### File Uploads
- **Current setup**: Files are stored in `backend/uploads/` folder
- **Limitation**: Free tier services have ephemeral file systems (files may be lost on restart)
- **Solution for production**: Use Cloudinary (free tier) or AWS S3

---

## 📝 Quick Reference

### Environment Variables Summary

**Backend (Render/Railway):**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/passport_automation
PORT=10000
ALLOWED_ORIGINS=https://your-frontend.vercel.app
JWT_SECRET=your-random-secret-key
NODE_ENV=production
```

**Frontend (Vercel/Netlify):**
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## 🎉 You're Done!

Your Passport Automation System is now live:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Database**: MongoDB Atlas (cloud-hosted)

### Next Steps:
1. Test all features (login, register, apply, verify)
2. Create admin user via registration
3. Consider adding Cloudinary for file storage (optional)
4. Set up custom domain (optional, paid)

---

## 💡 Tips

1. **Free Tier Limitations**:
   - Render: Services spin down after 15 min inactivity
   - Vercel: 100GB bandwidth/month (usually enough)
   - MongoDB Atlas: 512MB storage (enough for thousands of applications)

2. **Performance**:
   - First request after spin-down may take 30-60 seconds
   - Consider using a "ping" service to keep backend awake (UptimeRobot free tier)

3. **Security**:
   - Never commit `.env` files
   - Use strong `JWT_SECRET`
   - Keep MongoDB credentials secure

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Railway Documentation](https://docs.railway.app)

---

**Need Help?** Check the troubleshooting section or review your environment variables!

