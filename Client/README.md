🛠 Step by Step Folder Create Karne ka Tarika

Main Project Folder Banao

mkdir AI-CHATBOT
cd AI-CHATBOT


Client (React App) Setup

npm create vite@latest client
cd client
npm install
cd ..


Server (Express API) Setup

mkdir server
cd server
npm init -y
npm install express cors dotenv openai
cd ..


Folder Structure Manual Banao

client/src/components folder banao → yahan React components rakho (Avatar.jsx, Chat.jsx, etc.)

client/src/services folder banao → API calls (api.js) rakho.

server ke andar sirf server.js rakho (Express backend).

.env Files Alag-alag Rakho

Client me (frontend) .env → Vite ke liye

VITE_API_BASE=http://localhost:3001


Server me (backend) .env → OpenAI API key aur port ke liye

OPENAI_API_KEY=your_openai_api_key
PORT=3001


👉 Is tarah tumhare paas clear separation hoga:

client/ → React app ke liye

server/ → Express API ke liye

Isse samajhna aur maintain karna easy ho jayega.