# MERN Authentication Application

Full-stack authentication system with email verification and password reset. Built with MongoDB, Express, React, and Node.js.

🔗 **Live Demo:** [https://mern-auth-system-3-kycr.onrender.com](https://mern-auth-system-3-kycr.onrender.com)

> ⚠️ First load may take 30-50 seconds (Render free tier cold start)

## 🚀 Features

- **User Registration & Login** - JWT token-based authentication
- **Email Verification** - OTP-based account confirmation (24h validity)
- **Password Reset** - Secure recovery via email OTP (15min validity)
- **Session Management** - Auto-validation with HTTP-only cookies
- **Form Validation** - Client and server-side with Zod schemas
- **Security** - bcryptjs password hashing, CORS protection

## 📋 Tech Stack

### Frontend
- React 19 + Vite
- React Router DOM v7
- React Hook Form + Zod validation
- Tailwind CSS v4
- Axios
- React Toastify

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Axios (Brevo API client)
- Zod validation

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── context/         # Global state (AppContext)
│   │   ├── schemas/         # Zod validation schemas
│   │   └── assets/          # Images, templates
│   └── .env
│
├── server/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # MongoDB schemas
│   │   ├── middlewares/     # Auth & validation
│   │   ├── config/          # DB, email config
│   │   └── schemas/         # Zod schemas
│   └── .env
```

## 🛠️ Installation

### 1. Clone & Install

```bash
git clone <repository-url>
cd AuthApp

# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 2. Environment Variables

**server/.env:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_key_here
BREVO_API_KEY=your_brevo_api_key
SENDER_EMAIL=noreply@yourapp.com
PORT=4000
NODE_ENV=development
```

**client/.env:**
```env
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Run Development

```bash
# Terminal 1 - Server (port 4000)
cd server
npm run dev

# Terminal 2 - Client (port 5173)
cd client
npm run dev
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout (requires auth)
- `GET /api/auth/is-auth` - Check authentication
- `POST /api/auth/send-verify-otp` - Send email verification OTP
- `POST /api/auth/verify-account` - Verify email with OTP
- `POST /api/auth/send-reset-otp` - Request password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP

### User
- `GET /api/user/data` - Get user profile (requires auth)

## 🔐 User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  verifyOtp: String,
  verifyOtpExpireAt: Number,
  isAccountVerified: Boolean,
  resetOtp: String,
  resetOtpExpireAt: Number,
  timestamps: true
}
```

## 📱 Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Dashboard/landing page |
| `/login` | Login | Login & register forms |
| `/email-verify` | EmailVerify | OTP verification |
| `/reset-password` | ResetPassword | Password reset flow |

## 🔒 Security Features

- Passwords hashed with bcryptjs (10 rounds)
- JWT tokens stored in HTTP-only cookies (7 days)
- CORS enabled for cross-origin requests
- Input validation on client and server
- OTP expiration (verify: 24h, reset: 15min)

## 📧 Email Configuration

Uses **Brevo API** (v3) for sending emails:
- Account verification OTP
- Password reset OTP
- Welcome emails

### Setup
1. Create account at [Brevo](https://www.brevo.com/)
2. Get API key from Settings → API Keys
3. Verify sender email in Senders & IP
4. Add `BREVO_API_KEY` to environment variables

Email templates: `server/src/config/emailTemplates.js`

## 🚀 Deployment

Deployed on **Render** with separate services for frontend and backend.

### Backend Configuration
```
Root Directory: server
Build Command: npm install
Start Command: npm start
Environment: Node.js
```

### Frontend Configuration
```
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: dist
Type: Static Site
```

**Environment Variables:**
All `.env` variables must be set in Render dashboard for each service.

### MongoDB Setup
1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Add user with password
3. Whitelist all IPs (0.0.0.0/0)
4. Copy connection string to `MONGODB_URI`

## 🐛 Troubleshooting

**CORS errors:**
- Verify CORS configuration in backend
- Check browser console for specific error details

**Email not sending:**
- Verify Brevo API key is correct
- Check sender email is verified in Brevo dashboard
- Review Brevo API usage limits

**MongoDB connection:**
- Whitelist IP in MongoDB Atlas
- Verify connection string format

**Token issues:**
- Clear browser cookies
- Check JWT_SECRET consistency
- Verify 7-day expiration hasn't passed

## 📝 License

ISC License

---

**Live Demo:** [https://mern-auth-system-3-kycr.onrender.com](https://mern-auth-system-3-kycr.onrender.com)

*Built as a learning project to demonstrate full-stack MERN authentication with email verification and secure password management.*
