# CourseHub API

> A RESTful Node.js API for managing online courses, users, authentication, and enrollments, built with Express and MongoDB.

---

## Project Structure

```
coursehub-api/
├── config/               # Database and environment configs
├── controllers/          # Route handler logic
├── middlewares/          # Auth, error, and utility middlewares
├── models/               # Mongoose models (User, Course, etc.)
├── routes/               # Express route definitions
├── utils/                # Helper functions (e.g., email, JWT)
├── .env.example          # Example environment variables
├── server.js             # Application entry point
```

---

## Getting Started

### Prerequisites
- Node.js 18 or later
- MongoDB (local or Atlas)
- PNPM / NPM

### Installation

```bash
git clone https://github.com/yourusername/coursehub-api.git
cd coursehub-api
pnpm install   # or npm install
cp .env.example .env
```

### Environment Setup
Edit your `.env` file with values like:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/coursehub
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Running Locally

```bash
pnpm run dev    # or npm run dev
```

The server should start at `http://localhost:5000`

---

## API Endpoints (Preview)

### Auth
| Method | Endpoint                     | Description                 |
|--------|------------------------------|-----------------------------|
| POST   | `/api/v1/auth/register`      | Register a new user         |
| POST   | `/api/v1/auth/login`         | Login and receive tokens    |
| POST   | `/api/v1/auth/logout`        | Logout the user             |
| POST   | `/api/v1/auth/refresh`       | Refresh access token        |

### Courses
| Method | Endpoint                     | Description                 |
|--------|------------------------------|-----------------------------|
| GET    | `/api/v1/courses`            | Get all courses             |
| POST   | `/api/v1/courses`            | Create a course (admin)     |
| GET    | `/api/v1/courses/:id`        | Get course by ID            |

More detailed API documentation available in `api.pdf` or via Postman collection.

---

## Testing

```bash
pnpm run test   # or npm run test
```

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

---
## Author

Made with ❤️ by [Pratyoos](https://www.github.com/pratyoos).