import tuitsModel from "./tuits-model.js";

export const findAllTuits = () => {
    return tuitsModel.find()
                     .populate("author", "username")
                     .exec();
};

export const findTuitsByAuthor = (author) => {
    return tuitsModel.find({author: author});
};

export const createTuit = (tuit) => {
    return tuitsModel.create(tuit);
};

export const deleteTuit = (tuitId) => {
    return tuitsModel.deleteOne({_id: tuitId});
};

export const updateTuit = (tuitId, tuit) => {
    return tuitsModel.updateOne({_id: tuitId}, {$set: tuit});
};
