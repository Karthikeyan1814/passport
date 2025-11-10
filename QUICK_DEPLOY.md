# ⚡ Quick Deploy Guide

## Your MongoDB Connection String (Ready to Use)
```
mongodb+srv://km3974808_db_user:eLEbjqvaSPvY6yS1@cluster0.dzx2z3f.mongodb.net/passport_automation?retryWrites=true&w=majority
```

## 🎯 Backend Deployment (Render)

### Copy-Paste These Values:

**Service Configuration:**
- Name: `passport-backend`
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Plan: **Free**

**Environment Variables:**
```env
MONGODB_URI=mongodb+srv://km3974808_db_user:eLEbjqvaSPvY6yS1@cluster0.dzx2z3f.mongodb.net/passport_automation?retryWrites=true&w=majority
PORT=10000
ALLOWED_ORIGINS=https://your-frontend.vercel.app
JWT_SECRET=eca0c4d9679780fd881205f72062b9865b887de93345193c624def9760732bf1a356e409f011ed001e2854985061f9edaa47ec3878774fd4428617cdb5dc6d35
NODE_ENV=production
```

**Note:** Update `ALLOWED_ORIGINS` after you get your Vercel frontend URL.

---

## 🎯 Frontend Deployment (Vercel)

### Copy-Paste These Values:

**Project Configuration:**
- Framework: Create React App
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `build`

**Environment Variable:**
```env
REACT_APP_API_URL=https://your-backend.onrender.com
```

**Note:** Replace with your actual Render backend URL.

---

## 📝 Deployment Order

1. ✅ Deploy Backend first (get the URL)
2. ✅ Deploy Frontend (use backend URL)
3. ✅ Update Backend CORS with frontend URL

---

**That's it!** Your app will be live in ~10 minutes! 🚀

