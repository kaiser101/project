import LinearWithValueLabel from "./LinearWithValueLabel";

const TorrentComponent = ({ torrent }) => {
    return (
        <div>
            {torrent}
            <LinearWithValueLabel torrent={torrent} />
        </div>
    );
};

export default TorrentComponent;
