import React, { useState, useEffect } from "react";
import "./App.css";

const ws = new WebSocket("ws://localhost:8080");

ws.onopen = (event) => ws.send("ed9988d730d803047ca29cce1035851d1ef4af20");

const App = () => {
    const [msg, setMesg] = useState("");

    useEffect(() => {
        ws.onmessage = (event) => setMesg(event.data);
    }, []);

    return <div className="App">{msg}</div>;
};

export default App;
