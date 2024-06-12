const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    uploader: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

videoSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
