# 🔧 Fix CORS Error - Frontend to Backend Connection

## ❌ Current Problem

Your frontend on Vercel (`https://passport-digital.vercel.app`) is trying to connect to `localhost:5000` instead of your Render backend.

**Error:** `Access to XMLHttpRequest at 'http://localhost:5000/api/auth/register' from origin 'https://passport-digital.vercel.app' has been blocked by CORS policy`

## ✅ Solution

### Step 1: Update Vercel Environment Variable

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your project: `passport-digital` (or your project name)
3. Go to **Settings** → **Environment Variables**
4. Find `REACT_APP_API_URL` or create it if it doesn't exist
5. **Update the value to your Render backend URL:**
   ```
   https://passport-backend.onrender.com
   ```
   (Replace with your actual Render backend URL)
6. Click **Save**
7. **Important:** Go to **Deployments** tab
8. Click the **three dots (⋯)** on the latest deployment
9. Click **Redeploy** → This will rebuild with the new environment variable

### Step 2: Update Backend CORS in Render

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click on your `passport-backend` service
3. Go to **Environment** tab
4. Find `ALLOWED_ORIGINS` environment variable
5. **Update it to include your Vercel frontend URL:**
   ```
   https://passport-digital.vercel.app
   ```
   Or if you want both local and production:
   ```
   https://passport-digital.vercel.app,http://localhost:3000
   ```
6. Click **Save Changes**
7. Render will automatically redeploy

### Step 3: Verify Backend CORS Code

Make sure your `backend/server.js` has this CORS configuration:

```javascript
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

This should already be in your code, but verify it's there.

## 🎯 Quick Checklist

- [ ] Vercel: `REACT_APP_API_URL` = `https://your-backend.onrender.com`
- [ ] Vercel: Redeploy after updating environment variable
- [ ] Render: `ALLOWED_ORIGINS` = `https://passport-digital.vercel.app`
- [ ] Wait for both services to redeploy (5-10 minutes)

## 🔍 How to Find Your URLs

**Backend URL (Render):**
- Go to Render dashboard → Your service → Copy the URL (e.g., `https://passport-backend-xxxx.onrender.com`)

**Frontend URL (Vercel):**
- Go to Vercel dashboard → Your project → Copy the URL (e.g., `https://passport-digital.vercel.app`)

## ✅ After Fixing

1. Wait for both deployments to complete
2. Refresh your Vercel frontend page
3. Try registering again
4. Check browser console - CORS errors should be gone
5. You should see successful API calls to your Render backend

---

**The key issue:** Your frontend is still using `localhost:5000` instead of your Render backend URL. Update the Vercel environment variable and redeploy! 🚀

