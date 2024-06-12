import { useState } from "react";

const VideoIDForm = ({ searchVideoId }) => {
    const [videoId, setVideoId] = useState("");

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        await searchVideoId(videoId);
        setVideoId("");
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <div>
                    search video id
                    <input
                        type="text"
                        value={videoId}
                        placeholder="search video id"
                        onChange={({ target }) => setVideoId(target.value)}
                    />
                </div>
                <button type="submit">Search for ID</button>
            </form>
        </div>
    );
};

export default VideoIDForm;
