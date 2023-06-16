import mongoose from "mongoose";

const Schema = mongoose.Schema({
    tuit: String,
    title: String,
    likes: Number,
    liked: Boolean,
}, {collection: "tuits"});

export default Schema;