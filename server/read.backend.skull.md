SKELETON-MERN-FULL-STACK — Backend Documentation
📌 Project Overview

The SKELETON-MERN-FULL-STACK (Server) is a production-ready, scalable, secure backend architecture built using:

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication (Cookie-Based)

Role-Based Access (User & Admin)

Security Hardening

Structured Logging

API Versioning

This backend is designed as a reusable foundation for building large-scale MERN applications.

🏗 Architecture Philosophy

This project follows:

Clean architecture

Modular structure

Separation of concerns

Centralized error handling

Secure authentication design

Versioned API system

Flow:

Routes → Middlewares → Controllers → Models → Database

📂 Folder Structure (Server)
server
│
├── src
│   ├── apiRoutes
│   │   ├── v1
│   │   │   ├── adminRouters
│   │   │   ├── userRouters
│   │   │   └── index.v1.js
│   │   ├── v2
│   │   └── index.api.js
│   │
│   ├── config
│   │   ├── db.js
│   │   ├── env.js
│   │   └── logger.js
│   │
│   ├── controllers
│   │   ├── adminControllers
│   │   ├── userControllers
│   │   └── authControllers
│   │
│   ├── middlewares
│   ├── models
│   ├── utils
│   ├── logs
│   │
│   ├── app.js
│   └── index.js
│
├── .env
├── package.json

🚀 Core Components
1️⃣ Server Entry (index.js)

Connects to MongoDB

Loads environment variables

Starts Express server

Uses structured logging

2️⃣ Express App (app.js)

Includes:

Helmet (security headers)

CORS

JSON parser

Cookie parser

Mongo sanitize

XSS clean

Morgan logging

API routing

Global error handling

🔐 Authentication System

Two independent authentication systems:

Role	Cookie Name	Secret Used
User	token	JWT_SECRET
Admin	adminToken	ADMIN_JWT_SECRET

This separation increases security and flexibility.

👤 USER AUTH MODULE

Base Route:

/api/v1/user

Endpoints
Method	Route	Description
POST	/user-register	Register user
POST	/user-login	Login
POST	/user-profile	Protected profile
GET	/user-logout	Logout
GET	/user-refresh-token	Refresh JWT
Flow

Password hashed using bcrypt

JWT created on login

Stored in HTTP-only cookie

Middleware verifies token

Protected routes access granted

👨‍💼 ADMIN AUTH MODULE

Base Route:

/api/v1/admin

Endpoints
Method	Route	Description
POST	/admin-register	Register admin
POST	/admin-login	Login admin
POST	/admin-profile	Protected admin profile
GET	/admin-logout	Logout
GET	/admin-refresh-token	Refresh admin token

Admin uses:

Separate JWT secret

Separate cookie

Fixed role: "admin"

🛡 Security Features

This backend includes multiple production-level protections:

✅ Helmet

Secure HTTP headers.

✅ CORS

Restricted to frontend origin.

✅ express-mongo-sanitize

Prevents NoSQL injection attacks.

✅ xss-clean

Prevents XSS attacks.

✅ express-rate-limit

Limits authentication abuse.

✅ HTTP-only Cookies

Prevents client-side token access.

🧱 Middlewares
auth.middleware.js

authUser

authAdmin

Verifies:

Token exists

Token valid

User/Admin exists in DB

error.middleware.js

Centralized error handling

Production-safe responses

Logs errors using Winston

notFound.middleware.js

Handles invalid routes.

rateLimit.middleware.js

Limits requests:

100 requests / 15 minutes

🗄 Database Layer

Using:

MongoDB

Mongoose

User Model

Fields:

name

email (unique)

password (hidden)

role

Admin Model

Fields:

name

email

password

role = "admin"

📊 Logging System

Using Winston:

Logs stored in:

src/logs/access.log
src/logs/error.log


Console logging enabled in development mode.

🔄 API Versioning

Structure supports:

/api/v1/
/api/v2/


Currently implemented:

v1 → Authentication

v2 → Reserved for future upgrades

Allows backward compatibility in production.

⚙️ Environment Configuration

.env

PORT=4000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/skeletondb

JWT_SECRET=your_user_secret
JWT_EXPIRES=7d

ADMIN_JWT_SECRET=your_admin_secret
ADMIN_JWT_EXPIRES=7d

🎯 What This Backend Provides

✔ Production-ready structure
✔ JWT cookie authentication
✔ Separate admin system
✔ Role-based access control
✔ MongoDB integration
✔ Security hardening
✔ Centralized error handling
✔ Structured logging
✔ Rate limiting
✔ API versioning
✔ Clean modular architecture

🚀 How To Run
Install dependencies
npm install

Setup environment file

Create .env

Run server
npm run dev


Server runs on:

http://localhost:4000

🔮 Future Extension Ideas

You can now easily add:

Product module

Blog system

File uploads

Payment integration

Email verification

Forgot password system

Role-based permissions (RBAC)

Swagger API documentation

Docker support

Redis caching

🏁 Conclusion

The SKELETON-MERN-FULL-STACK backend is a secure, scalable, enterprise-level starter architecture for MERN applications.

It is built to:

Scale

Stay secure

Remain maintainable

Support production environments