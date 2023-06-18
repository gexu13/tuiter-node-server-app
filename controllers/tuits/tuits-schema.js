import mongoose from "mongoose";

const Schema = mongoose.Schema({
    tuit: String,
    title: String,
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    postTime: {type: Date, default: Date.now},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    handle: String,
    topic: String,
    image: String,
    username: String,

}, {collection: "tuits"});

export default Schema;