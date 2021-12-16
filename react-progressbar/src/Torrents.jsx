import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import TorrentComponent from "./TorrentComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Torrents = () => {
    const [torrents, setTorrents] = useState([]);

    const newTorrent = useRef(null);

    const addTorrent = () => {
        setTorrents([...torrents, newTorrent.current.value]);
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                    inputRef={newTorrent}
                />
                <Button variant="outlined" onClick={() => addTorrent()}>
                    Add Torrent
                </Button>
            </Box>
            {_.map(torrents, (torrent) => (
                <div key={torrent}>
                    <TorrentComponent torrent={torrent} />
                </div>
            ))}
        </div>
    );
};

export default Torrents;
