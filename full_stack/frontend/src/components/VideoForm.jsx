import { useState } from "react";

const VideoForm = ({ createVideoPost }) => {
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [videoUploader, setVideoUploader] = useState("");

    const handleVideoSubmit = async (event) => {
        event.preventDefault();
        const video = {
            title: videoTitle,
            url: videoLink,
            uploader: videoUploader,
            videoId: videoLink.split("/vimeo.com/")[1],
        };
        await createVideoPost(video);
        setVideoTitle("");
        setVideoLink("");
        setVideoUploader("");
    };

    return (
        <div>
            <h2>Save Vimeo Video</h2>
            <form onSubmit={handleVideoSubmit}>
                <div>
                    video title
                    <input
                        type="text"
                        value={videoTitle}
                        placeholder="video title"
                        onChange={({ target }) => setVideoTitle(target.value)}
                    />
                </div>
                <div>
                    video link
                    <input
                        type="text"
                        value={videoLink}
                        placeholder="video link"
                        onChange={({ target }) => setVideoLink(target.value)}
                    />
                </div>
                <div>
                    video uploader
                    <input
                        type="text"
                        value={videoUploader}
                        placeholder="video uploader"
                        onChange={({ target }) =>
                            setVideoUploader(target.value)
                        }
                    />
                </div>
                <button type="submit">Save video</button>
            </form>
        </div>
    );
};

export default VideoForm;
