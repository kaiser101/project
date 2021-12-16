import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import TorrentComponent from "./TorrentComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LinearWithValueLabel from "./LinearWithValueLabel";

const Torrents = () => {
    const [torrents, setTorrents] = useState([]);

    const newTorrent = useRef(null);

    const addTorrent = () => {
        setTorrents([...torrents, newTorrent.current.value]);
    };

    const removeTorrent = () => {
        setTorrents(
            _.remove(
                torrents,
                (torrent) => torrent !== newTorrent.current.value
            )
        );
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
                <Button variant="outlined" onClick={() => removeTorrent()}>
                    Remove Torrent
                </Button>
            </Box>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                }}
            >
                {_.map(torrents, (torrent) => (
                    <ListItem key={torrent}>
                        <LinearWithValueLabel torrent={torrent} />
                        <ListItemText primary={torrent.substring(0, 6)} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Torrents;
