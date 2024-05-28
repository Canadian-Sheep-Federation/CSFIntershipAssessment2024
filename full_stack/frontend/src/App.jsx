import { useState, useEffect } from "react";
import blogService from "./services/blog";
import vimeoService from "./services/vimeo";
import SearchResults from "./components/SearchResults";
import SearchForm from "./components/SearchForm";
import VideoForm from "./components/VideoForm";
import VideoPosts from "./components/VideoPosts";
import VideoIDForm from "./components/VideoIDForm";

function App() {
    const [vimeoSearchResults, setVimeoSearchResults] = useState([]);
    const [videoPosts, setVideoPosts] = useState([]);
    const [lastVideoId, setLastVideoId] = useState("");

    useEffect(() => {
        async function loadVideoPosts() {
            const videos = await blogService.getAll();
            setVideoPosts(videos);
        }
        loadVideoPosts();
    }, []);

    const searchVideo = async (videoQuery) => {
        try {
            const videoResults = await vimeoService.searchVideo(videoQuery);
            setVimeoSearchResults(videoResults);
        } catch (error) {
            console.log(error.message);
        }
    };

    const createVideoPost = async (video) => {
        try {
            const id = await blogService.create(video);
            const allPosts = await blogService.getAll();
            setLastVideoId(id);
            setVideoPosts(allPosts);
        } catch (error) {
            console.log(error.message);
        }
    };

    const searchVideoId = async (id) => {
        try {
            if (!id) {
                const allPosts = await blogService.getAll();
                setVideoPosts(allPosts);
            } else {
                const video = await blogService.getById(id);
                setVideoPosts([video]);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <SearchResults vimeoSearchResults={vimeoSearchResults} />
            <SearchForm searchVideo={searchVideo} />
            <VideoForm createVideoPost={createVideoPost} />
            <VideoIDForm searchVideoId={searchVideoId} />
            <VideoPosts lastVideoId={lastVideoId} videoPosts={videoPosts} />
        </div>
    );
}

export default App;
