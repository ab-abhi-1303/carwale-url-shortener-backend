# carwale-url-shortener-backend

# **URL Shortener Backend**

This backend service provides functionality to shorten URLs, redirect users to original URLs, and track analytics. Built with **Node.js**, **Express.js**, and **MongoDB**, it is designed for scalability, performance, and reliability.

---

## **Features**
- Shorten a long URL into a compact, shareable format.
- Redirect users to the original URL using the shortened link.
- Track click analytics for each shortened URL.
- Scalable architecture to handle millions of requests.
- Includes Docker support for easy deployment.

---

## **Tech Stack**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Environment**: Railway, Docker

---

## **API Documentation**

### **1. Shorten URL**
**Endpoint**: `POST /shorten`  
**Description**: Generates a short URL for the given original URL.

#### **Request**
```json
{
  "originalUrl": "https://www.example.com"
}
```

#### **Response**
```json
{
  "status": "success",
  "data": {
    "shortUrl": "https://carwale-url-shortener-backend-production.up.railway.app/abc123"
  }
}
```

### **2. Redirect URL**
**Endpoint**: `GET /:shortId`  
**Description**: Redirects users to the original URL when accessing the short URL.

### **3. Get Analytics for a URL**
**Endpoint**: `GET /analytics/:shortId`  
**Description**: Retrieves analytics data for a specific shortened URL.
#### **Response**
```json
{
  "status": "success",
  "data": {
    "originalUrl": "https://www.example.com",
    "shortUrl": "https://carwale-url-shortener-backend-production.up.railway.app/abc123",
    "clickCount": 42,
    "createdAt": "2025-01-01T10:00:00Z"
  }
}
```

To run locally:
1. npm install
2. Create a .env file with:
        
MONGO_URI=your-mongodb-connection-string
BASE_URL=https://your-domain.com

3. npm start
