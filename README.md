# 🎬 StreamLite Microservice Streaming Platform

StreamLite is a highly-scalable, Netflix-style video streaming prototype architected across a dedicated **Microservice Architecture** using Node.js, Express, and React. It dynamically fetches live, high-resolution movie data utilizing the public [OMDb API](http://www.omdbapi.com/) and stores session metrics persistently via MongoDB Atlas.

This robust full-stack project was engineered as part of the **CTSE Assignment 01: Microservices** syllabus.

---

## 🏗️ Architecture Stack

### Core Technologies
- **Docker Compose** containerization pipeline.
- **Node.js & Express.js** backend runtimes.
- **Mongoose / MongoDB Atlas** for cluster persistence.
- **Axios** scaling for inter-service REST HTTP interactions.
- **JSON Web Tokens (`JWT`)** securely injecting cross-service payload verification.

### Frontend Engine (Port 3000)
- **React 18** initialized natively with **Vite**.
- **Tailwind CSS v3** styling with cinematic gradient backdrop integrations.
- **React-Toastify** generating dynamic user alerts.
- **Lucide-React** injecting lightweight SVG micro-UI components.

---

## 🌐 The Microservices Array

This system employs a strict 4-cluster decoupled configuration running synchronously:

1. 🔐 **User Service (Port `5001`)**: Interacts exclusively to handle `bcrypt` hashed user authentication, data registration, validations, and local JWT issuing.
2. 🎥 **Catalog Service (Port `5002`)**: Bypasses local storage to strictly interface with the **OMDb Live Web API**, generating randomized Netflix scroll-rows of action blockbusters, handling querying logic, and dynamically replacing compressed portrait posters with uncompressed `SX1920` aesthetic HTTP artwork fetches.
3. 📺 **Watchlist Service (Port `5003`)**: A multi-directional validation server interacting simultaneously between the User endpoint and Catalog metadata to save personalized arrays.
4. ▶️ **Playback & History Service (Port `5004`)**: Produces deterministic playback metrics globally by faking telemetry percentages inside a graphical video layout.

---

## 🚀 How to Build and Run Locally

StreamLite utilizes a primary `docker-compose.yml` configuration orchestrator unifying all 4 backend microservices and the Vite frontend simultaneously.

1. Ensure **Docker Desktop** is currently executing on your machine.
2. Run a `git clone` or manually navigate to your local `CTSE V02` project root folder terminal.
3. Dispatch the core orchestrator script:
```bash
docker compose up --build -d
```
4. Once your container modules finish compiling and distributing, smoothly access via:
👉 **[http://localhost:3000](http://localhost:3000)**

*(If running without docker, ensure `.env` parameters resolve individually mapped URL constraints per-service, and execute `npm install ; npm start` natively per-folder).*
