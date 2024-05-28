const SearchResults = (props) => {
    return (
        <div>
            <h2>Search results</h2>
            <ol>
                {props.vimeoSearchResults.length > 0
                    ? props.vimeoSearchResults.map((video, index) => (
                          <li key={index}>
                              <h3>{video.title}</h3>
                              <p>
                                  <strong>Description: </strong>
                                  {video.description}
                              </p>
                              <p>
                                  <strong>Uploader: </strong>
                                  {video.uploader}
                              </p>
                              <p>
                                  Watch Video:{" "}
                                  <a
                                      href={video.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                  >
                                      {video.url}
                                  </a>
                              </p>
                          </li>
                      ))
                    : null}
            </ol>
        </div>
    );
};

export default SearchResults;
