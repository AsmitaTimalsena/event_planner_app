import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/events/")
      .then(res => setEvents(res.data));
  }, []);

  const addEvent = () => {
    if (!title.trim()) return;
    axios.post("http://127.0.0.1:8000/api/events/", {
      title,
      date: new Date().toISOString().split("T")[0],
    }).then(() => {
      setTitle("");
      return axios.get("http://127.0.0.1:8000/api/events/");
    }).then(res => setEvents(res.data));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1rem", fontFamily: "sans-serif" }}>

      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: "1.5rem" }}>📅 Event planner</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: "2rem" }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addEvent()}
          placeholder="Add an event title…"
          style={{
            flex: 1, padding: "8px 12px", fontSize: 15,
            border: "1px solid #ccc", borderRadius: 8, outline: "none",
          }}
        />
        <button
          onClick={addEvent}
          style={{
            padding: "8px 18px", fontSize: 14, borderRadius: 8,
            border: "none", background: "#3b82f6", color: "white",
            cursor: "pointer", fontWeight: 500,
          }}
        >
          + Add
        </button>
      </div>

      {events.length === 0 ? (
        <p style={{ color: "#888", fontSize: 14 }}>No events yet — add one above!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {events.map(e => (
            <li key={e.id} style={{
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              fontSize: 15,
              display: "flex",
              justifyContent: "space-between",
            }}>
              <span>{e.title}</span>
              <span style={{ color: "#888", fontSize: 13 }}>{e.date}</span>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default App;