🌤️ Weather Now

A modern weather application built with React and Vite that allows users to search for real-time weather information by city.

This project focuses on clean async data handling, defensive UI logic, and modern frontend tooling.

🚀 Live Features

🌍 Search weather by city name

🌡️ Real-time temperature, humidity, wind, highs & lows

🎨 Dynamic theme changes based on weather conditions

⏳ Loading & error states (no crashes on bad input)

📱 Responsive UI

🧠 Key Technical Highlights

Vite + React for fast development and modern tooling

OpenWeatherMap API for geocoding and weather data

Styled-components for dynamic theming

React Router for routing (future-ready)

Defensive programming to prevent runtime crashes

Async/await based data flow (no race conditions)

🛠️ Tech Stack

Frontend: React, Vite

Styling: styled-components

Routing: react-router-dom

API: OpenWeatherMap

Build Tool: Vite

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/weather-now.git
cd weather-now

2️⃣ Install dependencies
npm install

3️⃣ Add environment variables

Create a .env file in the project root:

VITE_WEATHER_API_KEY=your_openweathermap_api_key


⚠️ API keys are not committed for security reasons.

4️⃣ Run the app
npm run dev


The app will be available at:

http://localhost:5173

📸 Screenshots

(Optional but highly recommended — add later)

Main weather dashboard

Search results

Error / no-data state

🧪 Error Handling & Edge Cases

Invalid city names do not crash the app

Network failures are handled gracefully

Weather data access is guarded against undefined values

No reliance on unstable third-party IP detection services

🧩 Project Structure (Simplified)
src/
├── components/
│   └── main/
├── core-ui/
│   ├── Globals.js
│   └── Themes.styled.js
├── App.jsx
├── main.jsx

📈 What I Learned

Migrating legacy React projects from CRA to Vite

Debugging real-world async bugs and runtime crashes

Handling external API failures safely

Writing maintainable React side-effects

Importance of simplifying over over-engineering

🔮 Future Improvements

🌦️ 5-day weather forecast

🌡️ Celsius / Fahrenheit toggle

🔍 City autocomplete

🧪 Unit & integration tests

📱 Improved mobile UX

👤 Author

Mohd Haseeb
Frontend Developer | React | JavaScript

⭐ If you like this project, give it a star!