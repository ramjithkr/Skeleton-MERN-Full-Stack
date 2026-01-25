server/
├── src/
│   ├── config/
│   │   ├── env.js
│   │   ├── db.js
│   │   └── logger.js        👈 (Winston here)
│   │
│   ├── controllers/
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   └── user.auth.controller.js
│   │   └── admin/
│   │       ├── admin.controller.js
│   │       └── admin.auth.controller.js
│   │
│   ├── routes/
│   │   ├── index.api.js
│   │   └── v1/
│   │       ├── index.v1.js
│   │       ├── user/
│   │       │   ├── user.routes.js
│   │       │   └── user.auth.routes.js
│   │       └── admin/
│   │           ├── admin.routes.js
│   │           └── admin.auth.routes.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── admin.model.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── notFound.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── morgan.middleware.js   👈
│   │
│   ├── utils/
│   │   ├── token.js
│   │   └── AppError.js
│   │
│   ├── logs/               👈 ONLY ONE logs folder
│   │   ├── access.log
│   │   └── error.log
│   │
│   ├── app.js
│   └── index.js
│
├── ecosystem.config.js     👈 PM2
├── .env
├── package.json
└── README.md
