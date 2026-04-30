# Vercel Deployment — Node.js Backend

This project is configured for deployment on Vercel using **Node.js Serverless Functions**.

## Architecture

- **Frontend**: Static HTML/CSS/JS (Bootstrap + jQuery AJAX)
- **Backend**: Node.js serverless functions in `/api`
- **Databases**: MySQL (Aiven) + MongoDB (Atlas) + Redis (Upstash)

## API Endpoints

| Route | File | Purpose |
|-------|------|---------|
| `POST /api/login` | `api/login.js` | Authenticate user, create Redis session |
| `POST /api/register` | `api/register.js` | Register user (MySQL + MongoDB) |
| `GET /api/profile` | `api/profile.js` | Fetch profile from MongoDB |
| `POST /api/profile` | `api/profile.js` | Update profile in MongoDB |

## Environment Variables (set in Vercel Dashboard)

```
SQL_HOST=
SQL_USER=
SQL_PASS=
SQL_DB=
SQL_PORT=
REDIS_BASE_URL=
REDIS_TOKEN=
MONGO_URI=
```

## Deploy

1. Push to GitHub
2. Import repo on vercel.com
3. Add environment variables in Settings → Environment Variables
4. Redeploy
