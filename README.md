# AI Chat Assistant

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)

**Author:** Mohammad Danish  
**Email:** khanDanishindia04  
**LinkedIn:** [https://www.linkedin.com/in/mohammad-danish-dev/](https://www.linkedin.com/in/mohammad-danish-dev/)

---

## Overview

AI Chat Assistant is a **React-based web application** that provides **interactive AI conversations**.  
It integrates with **OpenAI API** through an **Express backend**, ensuring your API key stays secure on the server.  

**Features:**
- Real-time AI chat interface  
- Clean and responsive UI  
- Copy messages with a single click  
- Lightweight and easy to customize  

---

## Folder Structure
<img width="276" height="579" alt="image" src="https://github.com/user-attachments/assets/d359a6b1-7ba7-48ea-a802-ee3922f68172" />



---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd AI-CHATBOT

### 2. Setup Client (React)

cd client
npm install

### 3. Setup Server (Express)
cd ../server
npm install

4. Environment Variables
Frontend (.env)
VITE_API_BASE=http://localhost:3001

Backend (.env)
OPENAI_API_KEY=your_openai_api_key
PORT=3001

5. Run the Application

Start Backend Server:
cd server
npm run dev

Start Frontend React App:
cd client
npm run dev

Open the app at http://localhost:5173
 (default Vite port).

