import mongoose from "mongoose";
const songSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        }, 
        artist: {
            type: String,
            required: true,
        },
        startDate: {
            type: Number, 
            required: true,
        },
    }, 
    {
        timestamps: true,
    }
)
export const Song = mongoose.model('Song', songSchema);