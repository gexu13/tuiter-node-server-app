import * as tuitsDao from "./tuits-dao.js";

const TuitsController = (app) => {

    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.get('/api/tuits/my_tuits', findTuitsByAuthor);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}

const createTuit = async (req, res) => {
    let newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    const currentUser = req.session['currentUser'];
    newTuit.handle = "@" + currentUser.username;
    newTuit.topic = "Space";
    newTuit.image = currentUser.avatar;
    newTuit.username = currentUser.username;
    newTuit= {...newTuit, author: currentUser._id };
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
};

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findAllTuits();
    res.json(tuits);
};

const findTuitsByAuthor = async (req, res) => {
    const currentUser = req.session['currentUser'];
    const tuits = await tuitsDao.findTuitsByAuthor(currentUser._id);
    res.json(tuits);
};

const deleteTuit = async (req, res) => {
    const tuitIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitIdToDelete);
    res.json(status);
};

const updateTuit = async (req, res) => {
    const tuitId = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitId, updates);
    res.json(status);
};

export default TuitsController;




