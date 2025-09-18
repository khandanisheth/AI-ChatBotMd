import React, { useState, useEffect } from "react";
import Chat from "./components/Chat.jsx";

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="logo">DK</div>
        <div className="titles">
          <h1>Dk Chatbot</h1>
          <p>Your chat is private • Enter to send, Shift+Enter = newline</p>
        </div>
        <button className="btn ghost btnleft" onClick={toggleTheme}>
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <Chat />
    </div>
  );
}
