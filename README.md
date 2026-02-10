# 🎬 CineMind: Neural Film Production Suite

**Transforming Script into Cinema with Generative Intelligence & Persistent Data.**

CineMind is a state-of-the-art AI-powered platform designed for directors, cinematographers, and production designers. It bridges the gap between raw script text and visual execution by leveraging Large Language Models (LLMs) and persistent MySQL data layers.

---

## 🚀 Key Modules

### 🧠 Script Intelligence
Upload `.pdf` or `.fdx` scripts for automated **Narrative DNA Extraction**. Identifies characters, locations, and calculates technical risk scores using backend processing.

### ⚡ Scene Intent Engine
Extract internal creative intent. Input scene snippets to retrieve:
- **Atmospheric Temperature**: Visual tone and lighting mood.
- **Narrative Subtext**: Hidden emotional beats.
- **Planning Signals**: Suggested camera movements and soundscapes.

### 🎥 AI Video Previz
The future of storyboarding. High-fidelity rendering simulations that convert scene descriptions into animated neural previews with integrated timecodes and technical overlays.

### 🗄️ Production History
Full persistence layer. Every analysis, every script upload, and every creative decision is timestamped and stored in a **MySQL Database** for cross-session recovery.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Framer Motion, Lucide React |
| **Styling** | Modern CSS Variables, Glassmorphism architecture |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (with automated schema initialization) |
| **AI Integration** | OpenAI GPT-4 / 3.5 Turbo |
| **File Handling** | Multer (Multipart/form-data) |

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MySQL Server

### 2. Frontend Setup
```bash
npm install
npm run dev
```

### 3. Backend Setup
Navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=cinemind
OPENAI_API_KEY=your_openai_key_here
```

### 4. Running the Project
Launch the backend:
```bash
node server/index.js
```

The system will automatically initialize the `cinemind` database and all required tables (`users`, `script_analysis`) upon first connection.

---

## 🎨 Design Philosophy
CineMind utilizes a **"Neo-Noir"** aesthetic:
- **Deep Space Palette**: Using `#0a0a0c` base with neon `#c084fc` and `#6366f1` accents.
- **Glassmorphism**: High-blur backdrops for premium depth.
- **Atomic Components**: Fully responsive, data-driven UI widgets.

---

## 🏆 Hackathon Highlights
- **Real-time Persistence**: Unlike typical prototypes, CineMind saves data to a real database.
- **Hybrid AI Logic**: Seamlessly falls back to high-quality mock data if API limits are reached.
- **Full-Stack Synergy**: Cohesive communication between React and Express via a custom `apiService` layer.

---
*Created with ❤️ by the CineMind Team.*
