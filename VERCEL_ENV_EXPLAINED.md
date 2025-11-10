# 🔍 How Vercel Handles Environment Variables

## ❓ Your Question
"How does Vercel track the `.env` file if we haven't pushed it?"

## ✅ Answer: Vercel DOESN'T Use `.env` Files!

**Important:** Vercel **does NOT** read `.env` files from your repository. Here's why:

### 1. `.env` Files Are NOT Pushed to GitHub

Check your `.gitignore` file - `.env` files are excluded:
```
.env
.env.local
.env.development.local
...
```

This means:
- ✅ `.env` files stay on your local machine
- ✅ They are NOT committed to Git
- ✅ They are NOT pushed to GitHub
- ✅ Vercel never sees them

### 2. Vercel Uses Dashboard Environment Variables

Vercel reads environment variables from **two places only**:

1. **Vercel Dashboard** (for production)
   - Go to: Settings → Environment Variables
   - These are set manually in the dashboard
   - They are NOT from `.env` files

2. **Build-time environment variables**
   - Set during the build process
   - Configured in Vercel dashboard

## 📋 How It Actually Works

### Local Development (Your Computer)
```
frontend/.env file → Used by React → Connects to backend
```
- `.env` file is read by `npm start`
- Used only on your local machine
- Never pushed to GitHub

### Production (Vercel)
```
Vercel Dashboard → Environment Variables → Build Process → React App
```
- Vercel dashboard settings
- Set manually in Vercel UI
- Used during build and runtime

## 🎯 What You Need to Do

### Step 1: Update Local `.env` (Optional - for local dev)
```env
REACT_APP_API_URL=https://your-backend.onrender.com
```
This is only for testing locally on your computer.

### Step 2: Set in Vercel Dashboard (REQUIRED - for production)
1. Go to **Vercel Dashboard** → Your project
2. **Settings** → **Environment Variables**
3. Add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend.onrender.com`
4. **Save**
5. **Redeploy** (this is important!)

## 🔄 The Flow

```
Local Development:
  Your Computer → .env file → npm start → Uses localhost or Render URL

Production (Vercel):
  GitHub Repo → Vercel Build → Reads from Dashboard → Uses Render URL
  (No .env file involved!)
```

## ✅ Summary

| Location | Uses `.env` File? | How to Set |
|----------|------------------|------------|
| **Local Dev** | ✅ Yes | Edit `frontend/.env` |
| **Vercel Production** | ❌ No | Set in Vercel Dashboard |

**Key Point:** 
- `.env` files are for **local development only**
- Vercel uses **dashboard environment variables**
- They are **completely separate** systems

---

**So to fix your CORS error:**
1. ✅ Update `.env` locally (for local testing)
2. ⚠️ **MUST:** Set `REACT_APP_API_URL` in Vercel dashboard
3. Redeploy on Vercel

The `.env` file change won't affect Vercel - you MUST set it in the dashboard!

