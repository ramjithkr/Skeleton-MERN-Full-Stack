client
│
├── node_modules
│
├── public
│   ├── index.html
│   ├── favicon.ico
│   └── assets
│       └── images
│
├── src
│   │
│   ├── api
│   │   ├── axios.js
│   │   ├── auth.api.js
│   │   ├── user.api.js
│   │   └── admin.api.js
│   │
│   ├── app
│   │   ├── store.js
│   │   └── rootReducer.js
│   │
│   ├── components
│   │   ├── common
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── layout
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── AdminSidebar.jsx
│   │   │
│   │   └── protected
│   │       ├── UserProtectedRoute.jsx
│   │       └── AdminProtectedRoute.jsx
│   │
│   ├── features
│   │   ├── auth
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── authSlice.js
│   │   │
│   │   ├── user
│   │   │   ├── Profile.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── userSlice.js
│   │   │
│   │   └── admin
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageUsers.jsx
│   │       └── adminSlice.js
│   │
│   ├── hooks
│   │   ├── useAuth.js
│   │   └── useDebounce.js
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── Unauthorized.jsx
│   │
│   ├── routes
│   │   ├── UserRoutes.jsx
│   │   ├── AdminRoutes.jsx
│   │   └── AppRoutes.jsx
│   │
│   ├── services
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   └── admin.service.js
│   │
│   ├── styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   │
│   ├── utils
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── toast.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── package-lock.json
