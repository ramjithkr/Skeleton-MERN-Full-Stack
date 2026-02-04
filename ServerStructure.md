SKELETON-MERN-FULL-STACK
│
├── client
│
├── server
│   ├── node_modules
│   │
│   ├── src
│   │   ├── apiRoutes
│   │   │   ├── v1
│   │   │   │   ├── adminRouters
│   │   │   │   │   ├── admin.auth.routers.js
│   │   │   │   │   └── admin.routers.js
│   │   │   │   │
│   │   │   │   ├── userRouters
│   │   │   │   │   ├── user.auth.routers.js
│   │   │   │   │   ├── user.routers.js
│   │   │   │   │   └── index.v1.js
│   │   │   │
│   │   │   ├── v2
│   │   │   │   └── index.v2.js
│   │   │   │
│   │   │   └── index.api.js
│   │   │
│   │   ├── config
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   └── logger.js
│   │   │
│   │   ├── controllers
│   │   │   ├── adminControllers
│   │   │   │   └── admin.auth.controller.js
│   │   │   │
│   │   │   ├── authControllers
│   │   │   │   └── generateToken.js
│   │   │   │
│   │   │   └── userControllers
│   │   │       └── user.auth.controller.js
│   │   │
│   │   ├── logs
│   │   │   ├── access.log
│   │   │   └── error.log
│   │   │
│   │   ├── middlewares
│   │   │   ├── auth.middleware.js
│   │   │   ├── morgan.middleware.js
│   │   │   ├── notFound.middleware.js
│   │   │   └── rateLimit.middleware.js
│   │   │
│   │   ├── models
│   │   │   ├── admin
│   │   │   │   └── admin.model.js
│   │   │   │
│   │   │   └── user
│   │   │       └── user.model.js
│   │   │
│   │   ├── types
│   │   │   └── xss-clean.d.ts
│   │   │
│   │   ├── utils
│   │   │   └── AppError.js
│   │   │   └── generateToken.js
│   │   │
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── ClientStructure.md
├── README.md
├── LICENSE
├── .gitignore
└── package-lock.json
