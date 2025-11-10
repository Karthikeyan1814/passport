# 🔧 Fix Render Deployment Error

## ❌ Current Problem
The error shows: `bash: line 1: n: command not found`

This means your **Start Command** in Render is set to just `n` instead of the correct command.

## ✅ Solution

### Step 1: Go to Render Dashboard
1. Open your Render dashboard: https://dashboard.render.com
2. Click on your `passport-backend` service

### Step 2: Fix the Start Command
1. Click **"Settings"** tab (or **"Environment"** tab)
2. Scroll down to **"Start Command"**
3. **Change it from:** `n`
4. **To:** `npm start`
5. Click **"Save Changes"**

### Step 3: Verify All Settings

Make sure these are correct:

**Service Settings:**
- **Root Directory**: `backend` ✅
- **Build Command**: `npm install` ✅
- **Start Command**: `npm start` ✅ (FIX THIS!)
- **Environment**: `Node` ✅

**Environment Variables:**
```
MONGODB_URI=mongodb+srv://km3974808_db_user:eLEbjqvaSPvY6yS1@cluster0.dzx2z3f.mongodb.net/passport_automation?retryWrites=true&w=majority
PORT=10000
ALLOWED_ORIGINS=https://your-frontend.vercel.app
JWT_SECRET=eca0c4d9679780fd881205f72062b9865b887de93345193c624def9760732bf1a356e409f011ed001e2854985061f9edaa47ec3878774fd4428617cdb5dc6d35
NODE_ENV=production
```

### Step 4: Redeploy
1. After saving, Render will automatically redeploy
2. Or click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait 5-10 minutes
4. Check the logs - you should see:
   - `✅ MongoDB connected`
   - `🚀 Server running at http://localhost:10000`

## 🎯 Correct Configuration Summary

| Setting | Value |
|---------|-------|
| Root Directory | `backend` |
| Build Command | `npm install` |
| **Start Command** | **`npm start`** ← FIX THIS |
| Environment | `Node` |

---

**After fixing, your deployment should work!** 🚀

