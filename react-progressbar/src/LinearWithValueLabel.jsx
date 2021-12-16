import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import mqtt from "mqtt";
// import consumeMessage from "./utils/consumer";

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

export default function LinearWithValueLabel(torrent) {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            // consumeMessage("3D348C15F852E885E6F6AFA0F1A22927D37EDAA5");
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 10 : prevProgress + 10
            );
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}
