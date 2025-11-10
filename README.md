# Passport Automation System

A full-stack web application for managing passport applications with role-based access control. Built with React (frontend) and Node.js/Express (backend) using MongoDB.

## 🚀 Features

- **Multi-Role System**: Applicant, Verifying Officer, Police, and Admin roles
- **Application Management**: Submit, track, and verify passport applications
- **Document Upload**: Secure file uploads for required documents
- **Status Tracking**: Real-time application status updates
- **Role-Based Dashboards**: Customized interfaces for each user role

## 📁 Project Structure

```
passport-automation-system/
├── backend/          # Node.js/Express API
│   ├── routes/       # API routes
│   ├── models/       # MongoDB models
│   ├── middleware/  # Auth & validation middleware
│   └── uploads/     # Document storage
├── frontend/         # React application
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── components/ # Reusable components
│   │   └── config/   # Configuration files
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Authentication**: JWT, Passport.js
- **File Upload**: Multer

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Karthikeyan1814/passport.git
   cd passport
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/passport_automation
   PORT=5000
   ALLOWED_ORIGINS=http://localhost:3000
   JWT_SECRET=your-secret-key
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Run the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🌐 Free Deployment

**Want to deploy this project for free?** Check out the comprehensive deployment guide:

👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)**

The guide covers:
- MongoDB Atlas setup (free database)
- Backend deployment on Render/Railway (free)
- Frontend deployment on Vercel/Netlify (free)
- Environment variable configuration
- Troubleshooting tips

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Applications
- `GET /api/applications` - Get all applications (auth required)
- `POST /api/applications/apply` - Submit new application

### Verification
- `GET /api/verify` - Get applications for verification
- `PUT /api/verify/:id` - Update verification status

### Police
- `GET /api/police/pending` - Get pending police verifications
- `PUT /api/police/verify/:id` - Submit police verification

### Admin
- `GET /api/admin/*` - Admin operations
- `PUT /api/admin/admin-verify/:id` - Admin verification
- `PUT /api/admin/issue-passport/:id` - Issue passport

## 👥 User Roles

1. **Applicant**: Submit passport applications, track status
2. **Verifying Officer**: Review and verify applications
3. **Police**: Conduct address/background verification
4. **Admin**: Manage all applications and users

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- Input validation

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for passport automation**

