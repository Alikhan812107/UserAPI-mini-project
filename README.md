Project Overview

This project is a Node.js & Express API integration application that demonstrates how to retrieve, process, and display data from multiple external APIs.
All API logic is implemented server-side, and the frontend consumes only the backend API.

The application fetches:

Random user data

Country information based on the user’s country

Currency exchange rates

News headlines related to the user’s country

The retrieved data is cleaned, combined, and returned as a single JSON response, which is then displayed on the frontend.

🧰 Technologies Used

Node.js

Express.js – backend server and routing

Axios – HTTP client for API requests

dotenv – environment variable management

HTML / CSS / JavaScript – frontend

📂 Project Structure
project/
│── server.js
│── package.json
│── .env
│── public/
│   ├── index.html
│   ├── style.css
│   └── app.js

⚙️ Setup Instructions
1️⃣ Clone or download the project
git clone <repository-url>
cd project-folder

2️⃣ Install dependencies
npm install


Required dependencies:

express

axios

dotenv

3️⃣ Configure environment variables

Create a .env file in the root directory:

EXCHANGE_API_KEY=your_exchange_rate_api_key
NEWS_API_KEY=your_news_api_key


⚠️ Important:

Do not share API keys publicly

.env file is not committed to version control

4️⃣ Run the server
node server.js


The server will start on:

http://localhost:3000

🌐 API Usage
🔹 Backend Endpoint
GET /api/profile

This endpoint aggregates data from multiple external APIs and returns a single JSON object.

Example URL:
http://localhost:3000/api/profile

Example Response:
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "gender": "male",
    "age": 35,
    "dob": "1989-04-21T...",
    "picture": "https://...",
    "city": "London",
    "country": "United Kingdom",
    "address": "Baker Street 221"
  },
  "country": {
    "name": "United Kingdom",
    "capital": "London",
    "languages": ["English"],
    "currency": "GBP",
    "flag": "https://..."
  },
  "exchangeRates": {
    "base": "GBP",
    "USD": 1.26,
    "KZT": 580.3
  },
  "news": [
    {
      "title": "...",
      "description": "...",
      "image": "...",
      "url": "..."
    }
  ]
}

🔗 External APIs Used

Random User API
Generates random user profile data.

REST Countries API
Retrieves country details based on user’s country.

ExchangeRate API
Converts local currency to USD and KZT.

News API
Fetches news headlines related to the user’s country.

All external API calls are performed server-side only.

🧠 Key Design Decisions
✅ Server-Side API Integration

All external API requests are handled on the backend to:

Protect API keys

Centralize logic

Improve security

✅ Data Cleaning & Aggregation

Instead of returning raw API responses:

Only relevant fields are extracted

Data from multiple APIs is combined into one response

Frontend receives a clean and structured JSON object

✅ Graceful Error Handling

External APIs may:

Fail

Return authorization errors

Have rate limits

To handle this:

try/catch blocks are used

Missing data is replaced with fallback messages

The application never crashes due to API failures

✅ Simple Frontend

The frontend:

Uses vanilla JavaScript

Fetches data only from /api/profile

Dynamically renders content

Handles missing data safely

This keeps the focus on API integration, as required by the assignment.

🧪 How to Test the Application

Start the server:

node server.js


Open browser:

http://localhost:3005


Click “Get Random User”

To inspect backend JSON directly:

http://localhost:3005/api/profile

🔐 Security Notes

API keys are stored in .env

No API keys are exposed in frontend

External APIs are never called from the browser

✅ Assignment Compliance Checklist

✔ Random User API integrated

✔ REST Countries API integrated

✔ Exchange Rate API integrated

✔ News API integrated

✔ Server runs on port 3005

✔ Logic implemented in core JS files

✔ Data displayed on frontend

✔ Clean project structure

✔ Error handling implemented

👤 Author

Student Name: Alikhan Mukhamed-Rakhym
Course: Web Development / Backend.
Assignment: API Integration Project
