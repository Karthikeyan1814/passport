# 🔧 Troubleshooting Vercel Environment Variable Issue

## ❌ Problem
Even after setting `REACT_APP_API_URL` in Vercel and redeploying, the frontend still tries to connect to `localhost:5000`.

## ✅ Solutions to Try

### Solution 1: Verify Environment Variable in Vercel

1. Go to **Vercel Dashboard** → Your project
2. **Settings** → **Environment Variables**
3. Check if `REACT_APP_API_URL` exists
4. **Important:** Make sure it's set for **Production** environment
5. Value should be: `https://your-backend.onrender.com` (your actual Render URL)

### Solution 2: Clear Build Cache and Redeploy

1. Go to **Vercel Dashboard** → Your project
2. **Deployments** tab
3. Click **three dots (⋯)** on latest deployment
4. Click **Redeploy**
5. **IMPORTANT:** Check "Use existing Build Cache" → **UNCHECK IT**
6. Click **Redeploy**

This forces Vercel to rebuild with the new environment variable.

### Solution 3: Check Environment Variable Name

**Must be exactly:** `REACT_APP_API_URL`
- ✅ Correct: `REACT_APP_API_URL`
- ❌ Wrong: `REACT_APP_API` or `API_URL` or `REACT_API_URL`

React only reads variables that start with `REACT_APP_`

### Solution 4: Verify in Build Logs

1. Go to **Vercel Dashboard** → Your project
2. **Deployments** → Click on latest deployment
3. Check **Build Logs**
4. Look for: `REACT_APP_API_URL`
5. It should show your Render backend URL

If it shows `undefined` or `localhost:5000`, the environment variable isn't set correctly.

### Solution 5: Check All Environments

In Vercel, environment variables can be set for:
- Production
- Preview
- Development

Make sure `REACT_APP_API_URL` is set for **Production** (or all environments).

### Solution 6: Verify the Value

Make sure the value is:
- ✅ `https://your-backend.onrender.com` (with https://)
- ❌ NOT `http://your-backend.onrender.com` (http won't work)
- ❌ NOT `your-backend.onrender.com` (missing https://)

## 🔍 How to Verify It's Working

After redeploying, check the built files:

1. In Vercel deployment logs, search for your backend URL
2. Or check the browser's Network tab:
   - Open DevTools → Network tab
   - Try to register
   - Check the request URL - it should be your Render URL, not localhost

## 📝 Step-by-Step Fix

1. **Vercel Dashboard** → Your project
2. **Settings** → **Environment Variables**
3. **Delete** `REACT_APP_API_URL` if it exists (to start fresh)
4. **Add New:**
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://passport-backend-xxxx.onrender.com` (your actual URL)
   - **Environment**: Select **Production** (or all)
5. **Save**
6. **Deployments** → **Redeploy** → **Uncheck "Use existing Build Cache"**
7. Wait for deployment to complete
8. Test again

## ⚠️ Common Mistakes

1. ❌ Setting variable but not redeploying
2. ❌ Using wrong variable name (must be `REACT_APP_API_URL`)
3. ❌ Setting for wrong environment (must be Production)
4. ❌ Using http:// instead of https://
5. ❌ Not clearing build cache

---

**If still not working, share:**
- Your Render backend URL
- Screenshot of Vercel environment variables
- Build logs from Vercel

