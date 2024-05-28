const VideoPosts = (props) => {
    return (
        <div>
            <h2>Saved Video Posts</h2>
            <p>Most Recent Video ID: {props.lastVideoId}</p>
            <ol>
                {props.videoPosts.length > 0
                    ? props.videoPosts.map((video, index) => (
                          <li key={index}>
                              <p>
                                  <strong>{video.title}</strong> (
                                  {video.uploader})
                              </p>
                              <a
                                  href={video.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                  Watch {video.title}
                              </a>
                              <div>ID: {video.id}</div>
                          </li>
                      ))
                    : null}
            </ol>
        </div>
    );
};

export default VideoPosts;
