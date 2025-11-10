# 🔧 Frontend .env File Fix

## ✅ Fixed!

I've updated your `frontend/.env` file to use your Render backend URL instead of `localhost:5000`.

**Changed from:**
```
REACT_APP_API_URL=http://localhost:5000
```

**Changed to:**
```
REACT_APP_API_URL=https://passport-backend.onrender.com
```

(Replace `passport-backend.onrender.com` with your actual Render backend URL)

## ⚠️ Important for Vercel Deployment

**The `.env` file is NOT used in Vercel production builds!**

You **MUST** also set the environment variable in Vercel dashboard:

1. Go to **Vercel Dashboard** → Your project
2. **Settings** → **Environment Variables**
3. Add/Update:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend.onrender.com` (your actual Render URL)
4. **Save**
5. **Redeploy** your frontend (Deployments → Latest → Redeploy)

## 🧪 Testing Locally

After updating the `.env` file:
1. Stop your frontend if running (Ctrl+C)
2. Restart: `npm start`
3. The frontend will now connect to your Render backend

## 📝 For Local Development

If you want to test locally with your local backend:
- Change `.env` to: `REACT_APP_API_URL=http://localhost:5000`
- Make sure your local backend is running

For production (Vercel):
- Always set `REACT_APP_API_URL` in Vercel dashboard
- The `.env` file won't be used in production builds

---

**Next Steps:**
1. ✅ `.env` file updated (for local dev)
2. ⚠️ **IMPORTANT:** Set `REACT_APP_API_URL` in Vercel dashboard
3. Redeploy frontend on Vercel

