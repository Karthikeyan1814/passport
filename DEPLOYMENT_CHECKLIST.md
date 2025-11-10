# 🚀 Deployment Checklist - Quick Start

## ✅ Pre-Deployment (Already Done!)
- [x] Code committed to GitHub
- [x] MongoDB Atlas connection configured
- [x] Environment variables set up
- [x] API configuration updated

## 📋 Deployment Steps

### Step 1: Deploy Backend to Render (5 minutes)

1. **Go to Render**: https://render.com
2. **Sign up/Login** with GitHub
3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect repository: `Karthikeyan1814/passport`
   - Configure:
     - **Name**: `passport-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: **Free**
4. **Add Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://km3974808_db_user:eLEbjqvaSPvY6yS1@cluster0.dzx2z3f.mongodb.net/passport_automation?retryWrites=true&w=majority
   PORT=10000
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
   JWT_SECRET=eca0c4d9679780fd881205f72062b9865b887de93345193c624def9760732bf1a356e409f011ed001e2854985061f9edaa47ec3878774fd4428617cdb5dc6d35
   NODE_ENV=production
   ```
5. **Deploy** → Wait 5-10 minutes
6. **Copy Backend URL** (e.g., `https://passport-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel (3 minutes)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Add New Project**:
   - Import repository: `Karthikeyan1814/passport`
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
4. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://passport-backend.onrender.com
   ```
   (Use your actual Render backend URL from Step 1)
5. **Deploy** → Wait 2-3 minutes
6. **Copy Frontend URL** (e.g., `https://passport-automation.vercel.app`)

### Step 3: Update Backend CORS (2 minutes)

1. **Go back to Render Dashboard**
2. **Edit your backend service**
3. **Update Environment Variable**:
   - `ALLOWED_ORIGINS`: `https://passport-automation.vercel.app`
   (Use your actual Vercel frontend URL)
4. **Save** → Service will auto-redeploy

## 🎉 Done!

Your app is now live:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com

## 🔗 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com

## ⚠️ Important Notes

1. **Free Tier Limitations**:
   - Render services spin down after 15 min inactivity (first request may be slow)
   - Vercel: 100GB bandwidth/month (usually enough)

2. **Keep Services Awake** (Optional):
   - Use UptimeRobot (free) to ping your backend every 5 minutes
   - URL: https://uptimerobot.com

3. **File Uploads**:
   - Currently stored in `backend/uploads/`
   - Free tier has ephemeral storage (files may be lost on restart)
   - For production, consider Cloudinary (free tier)

---

**Ready to deploy?** Follow the steps above! 🚀

