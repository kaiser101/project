import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
    const [msg, setMesg] = useState("");

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = (event) =>
            ws.send("70e6cc3986807aa9044f9542aa13bf57bf3cdbe3");

        ws.onmessage = (event) => setMesg(event.data);

        return () => {
            ws.close();
        };
    }, []);

    return <div className="App">{msg}</div>;
};

export default App;
