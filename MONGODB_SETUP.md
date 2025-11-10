# MongoDB Atlas Connection Setup

## Your MongoDB Atlas Connection Details

**Cluster**: Cluster0  
**Username**: `km3974808_db_user`  
**Password**: `eLEbjqvaSPvY6yS1` (from the setup modal)

## Complete Connection String

Replace `<db_password>` with your actual password:

```
mongodb+srv://km3974808_db_user:eLEbjqvaSPvY6yS1@cluster0.dzx2z3f.mongodb.net/passport_automation?retryWrites=true&w=majority
```

## How to Use

### For Local Development

1. Create a `.env` file in the `backend` folder:
   ```env
   MONGODB_URI=mongodb+srv://km3974808_db_user:eLEbjqvaSPvY6yS1@cluster0.dzx2z3f.mongodb.net/passport_automation?retryWrites=true&w=majority
   PORT=5000
   ALLOWED_ORIGINS=http://localhost:3000
   JWT_SECRET=your-secret-key-here
   ```

2. Make sure `.env` is in `.gitignore` (it already is!)

3. Start your backend:
   ```bash
   cd backend
   npm start
   ```

### For Deployment (Render/Railway)

1. Go to your deployment platform (Render/Railway)
2. Add environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://km3974808_db_user:eLEbjqvaSPvY6yS1@cluster0.dzx2z3f.mongodb.net/passport_automation?retryWrites=true&w=majority`

## Security Notes

⚠️ **Important**: 
- Never commit your `.env` file to Git
- The `.gitignore` file already excludes `.env` files
- If you need to change the password, update it in MongoDB Atlas and update your environment variables

## Testing the Connection

After setting up, test the connection:

```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected!')).catch(err => console.error('❌ Error:', err));"
```

Or simply start your server and check the console for "✅ MongoDB connected".

## Next Steps

1. ✅ MongoDB Atlas is set up
2. ✅ Connection string is ready
3. Next: Deploy backend to Render/Railway (see DEPLOYMENT.md)
4. Next: Deploy frontend to Vercel/Netlify

---

**Your connection string is ready to use!** 🎉

