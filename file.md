mern-project/
│
├── client/                         # React (Frontend)
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── api/                    # Axios / API calls
│   │   │   ├── axios.js
│   │   │   └── auth.api.js
│   │   │
│   │   ├── assets/                 # Images, icons
│   │   │
│   │   ├── components/             # Reusable components
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   │
│   │   │   ├── ui/                 # Buttons, inputs, modals
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Input.jsx
│   │   │
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── context/                # React Context
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/                  # Custom hooks
│   │   │   └── useAuth.js
│   │   │
│   │   ├── routes/                 # Frontend routes
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── utils/                  # Helpers
│   │   │   └── constants.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│



server/
├── src/
│   ├── config/
│   │   ├── env.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   └── user.auth.controller.js
│   │   │
│   │   └── admin/
│   │       ├── admin.controller.js
│   │       └── admin.auth.controller.js
│   │
│   ├── routes/
│   │   ├── index.api.js
│   │   ├── v1/
│   │   │   ├── index.v1.js
/user
user.auth.routes.js
user.routes.js

/admin
admin.auth.routes.js
admin.routes.js

│   │   
│   │   └── v2/
│   │       └── index.v2.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── admin.model.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── notFound.middleware.js
router.middleware.js
│   │
│   ├── utils/
│   │   └── token.js

│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
