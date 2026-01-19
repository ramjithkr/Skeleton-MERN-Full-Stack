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
│   │   │
│   │   ├── v1/
│   │   │   ├── index.v1.js
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── user.routes.js
│   │   │   │   └── user.auth.routes.js
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── admin.routes.js
│   │   │       └── admin.auth.routes.js
│   │   │
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
│   │   ├── notFound.middleware.js
rateLimit.middleware.js
morgan.middleware.ts
│   │
│   ├── utils/
│   │   ├── token.js
│   │   └── AppError.js
│   │
logs/
combined.log
error.log


typrs/
xss-clean.d.ts


│   ├── app.js
│   └── index.js
│
├── .env
├── package.json
└── README.md



helmet – Secure HTTP headers
❓ What it does

Adds security-related HTTP headers to prevent:

XSS attacks

Clickjacking

MIME sniffing

Information leakage

//
import cors from "cors";

app.use(cors());



app.use(
  cors({
    origin: ["http://localhost:5173", "https://myapp.com"],
    credentials: true,
  })
);


MINIMUM security stack (recommended)
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());