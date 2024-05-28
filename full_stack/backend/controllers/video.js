const videoRouter = require("express").Router();
const Video = require("../models/video");

// get all from data store
videoRouter.get("/", async (request, response, next) => {
    try {
        const videos = await Video.find({});
        response.json(videos);
    } catch (error) {
        next(error);
    }
});

// get by id from data store
videoRouter.get("/:id", async (request, response, next) => {
    try {
        const video = await Video.findById(request.params.id);
        if (video) {
            response.json(video);
        } else {
            response.send(404).end();
        }
    } catch (error) {
        next(error);
    }
});

// get video data from Vimeo API using query
videoRouter.get("/search/:query", async (request, response, next) => {
    try {
        const vimeoClient = request.apiClients["vimeo"];
        let videos = await vimeoClient.searchVideo(request.params.query);
        let transformedVideos = [];
        for (let i = 0; i < Math.min(videos.length, 20); i++) {
            const video = videos[i];
            transformedVideos.push({
                videoId: video.link.split("/vimeo.com/")[1],
                title: video.name,
                description: video.description,
                url: video.link,
                uploader: video.user.name,
                uploaderId: video.user.uri.split("/users/")[1],
            });
        }
        response.json(transformedVideos);
    } catch (error) {
        next(error);
    }
});

// post to data store
videoRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;
        const video = new Video({
            title: body.title,
            url: body.url,
            uploader: body.uploader,
            videoId: body.videoId,
        });

        const newVid = await video.save();
        response.status(201).json({ id: savedVid._id });
    } catch (error) {
        next(error);
    }
});

module.exports = videoRouter;
