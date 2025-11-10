# 🔧 Final Fix for Vercel Environment Variable Issue

## ❌ Problem
Frontend on Vercel still tries to connect to `localhost:5000` even after setting `REACT_APP_API_URL` in Vercel dashboard.

## ✅ Step-by-Step Fix

### Step 1: Delete and Recreate Environment Variable

1. Go to **Vercel Dashboard** → Your project (`passport-digital`)
2. **Settings** → **Environment Variables**
3. **Delete** `REACT_APP_API_URL` if it exists
4. **Add New Environment Variable:**
   - **Key**: `REACT_APP_API_URL` (exact spelling, case-sensitive)
   - **Value**: `https://passport-backend-xxxx.onrender.com` (your actual Render URL)
   - **Environment**: Select **ALL** (Production, Preview, Development)
5. Click **Save**

### Step 2: Get Your Render Backend URL

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click on your `passport-backend` service
3. Copy the URL from the top (e.g., `https://passport-backend-xxxx.onrender.com`)
4. Make sure it starts with `https://` (not `http://`)

### Step 3: Clear Build Cache and Redeploy

1. In Vercel, go to **Deployments** tab
2. Click **three dots (⋯)** on the latest deployment
3. Click **Redeploy**
4. **IMPORTANT:** Uncheck "Use existing Build Cache"
5. Click **Redeploy**
6. Wait for deployment to complete (2-3 minutes)

### Step 4: Verify in Browser Console

After redeployment:
1. Open your Vercel site: `https://passport-digital.vercel.app`
2. Open Browser DevTools (F12)
3. Go to **Console** tab
4. Look for: `🔍 API_BASE_URL: https://your-backend.onrender.com`
5. If you see `localhost:5000`, the environment variable isn't working

## 🔍 Alternative: Check Built Files

1. Open your Vercel site
2. Press **Ctrl+U** (View Page Source)
3. Press **Ctrl+F** and search for: `localhost:5000`
4. If found, the environment variable isn't set correctly
5. Search for your Render backend URL - it should be there instead

## ⚠️ Common Issues

### Issue 1: Wrong Environment
- ❌ Set only for "Development"
- ✅ Set for "Production" or "All"

### Issue 2: Wrong Variable Name
- ❌ `REACT_APP_API` or `API_URL`
- ✅ `REACT_APP_API_URL` (must start with `REACT_APP_`)

### Issue 3: Wrong Value Format
- ❌ `http://backend.onrender.com` (http won't work)
- ❌ `backend.onrender.com` (missing https://)
- ✅ `https://backend.onrender.com` (correct format)

### Issue 4: Build Cache
- ❌ Redeploying with cache
- ✅ Clear build cache when redeploying

## 📝 Verification Checklist

- [ ] Environment variable name: `REACT_APP_API_URL` (exact)
- [ ] Value: `https://your-backend.onrender.com` (with https://)
- [ ] Environment: Set for **Production** or **All**
- [ ] Build cache: **Cleared** when redeploying
- [ ] Browser console: Shows Render URL, not localhost

## 🚀 Quick Test

After fixing, test by:
1. Opening your Vercel site
2. Opening DevTools Console
3. You should see: `🔍 API_BASE_URL: https://your-backend.onrender.com`
4. Try registering - should connect to Render backend

---

**If still not working, please share:**
1. Your Render backend URL
2. Screenshot of Vercel Environment Variables page
3. What the browser console shows for `API_BASE_URL`

