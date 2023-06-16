import * as tuitsDao from "./tuits-dao.js";

const TuitsController = (app) => {

    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);

}

const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
};

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findAllTuits();
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




