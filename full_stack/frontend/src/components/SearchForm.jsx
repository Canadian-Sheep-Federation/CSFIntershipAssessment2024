import { useState } from "react";

const SearchForm = ({ searchVideo }) => {
    const [videoQuery, setVideoQuery] = useState("");

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        await searchVideo(videoQuery);
        setVideoQuery("");
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <div>
                    search vimeo
                    <input
                        type="text"
                        value={videoQuery}
                        placeholder="search vimeo"
                        onChange={({ target }) => setVideoQuery(target.value)}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
