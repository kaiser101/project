import LinearWithValueLabel from "./LinearWithValueLabel";

const TorrentComponent = ({ torrent }) => {
    return (
        <div>
            <LinearWithValueLabel torrent={torrent} />
        </div>
    );
};

export default TorrentComponent;
