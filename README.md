# 🚀 NASA Picture Viewer (Frontend + Backend)

A full-stack web app to explore NASA's **Astronomy Picture of the Day (APOD)** and **Mars rover photos**, built with:

- ⚛️ React + Vite
- 🔙 Express.js
- 🧪 Jest + Supertest
- 🚀 Deployed on Vercel and Render

---

## 🌐 Live Demo

- **Frontend**: [nasa-frontend-jet.vercel.app](https://nasa-frontend-jet.vercel.app)
- **Backend**: [nasa-backend-ht26.onrender.com](https://nasa-backend-ht26.onrender.com)

---

## 📦 Features

- Fetches and displays NASA's **APOD** from the official API
- Fetches **Mars rover photos** via backend API proxy
- Responsive UI with Tailwind CSS
- Scroll to top button
- Loading spinners for better UX
- Backend REST API
- Unit and integration tests with Jest and Supertest

---

## 🛠 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/FerLeniz/nasa_project.git
cd nasa_project
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create a `.env` file

```env
PORT=3001
NASA_API_KEY=DEMO_KEY
```

You can get your own key from [api.nasa.gov](https://api.nasa.gov).

#### Run backend locally

```bash
npm run dev
```

API available at: `http://localhost:3001/api`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

#### Create a `.env` file

```env
VITE_BACKEND_URL=http://localhost:3001
```

#### Run frontend locally

```bash
npm run dev
```

Frontend available at: `http://localhost:5173`

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

Uses **Jest** and **Supertest** for API endpoint testing.


---

## 🚀 Deployment

- **Frontend**: Deployed via [Vercel](https://vercel.com/)
- **Backend**: Deployed via [Render](https://render.com/)

---

## 👤 Author

**Fernando Leniz**  
[GitHub Profile](https://github.com/FerLeniz)

---

## 📃 License

This project is licensed under the MIT License.
