import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import mqtt from "mqtt";
// import consumeMessage from "./utils/consumer";
import _ from "lodash";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function LinearWithValueLabel({ torrent }) {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = (event) => ws.send(_.toLower(torrent));

        ws.onmessage = (event) => setProgress(~~event.data);

        return () => {
            ws.close();
        };
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}
