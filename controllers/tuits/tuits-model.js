import mongoose from "mongoose";
import TuitsSchema from "./tuits-schema.js";

const tuitsModel = mongoose.model("TuitsModel", TuitsSchema);
export default tuitsModel;