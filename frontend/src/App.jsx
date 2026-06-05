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
    axios.post("http://127.0.0.1:8000/api/events/", {
      title: title,
      date: "2026-01-01"
    }).then(() => {
      setTitle("");
      return axios.get("http://127.0.0.1:8000/api/events/");
    }).then(res => setEvents(res.data));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Planner</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event title"
      />

      <button onClick={addEvent}>Add</button>

      <ul>
        {events.map(e => (
          <li key={e.id}>
            {e.title} - {e.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;