import posts from "./tuits.js";

let tuits = posts;

const TuitsController = (app) => {

    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);

}

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime() + "";
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    tuits.push(newTuit);
    res.json(newTuit);
};

const findTuits = (req, res) => {
    res.json(tuits);
};

const deleteTuit = (req, res) => {
    const tuitIdToDelete = req.params.tid;
    const index = tuits.findIndex(tuit => tuit._id === tuitIdToDelete);
    tuits.splice(index, 1);
    // tuits = tuits.filter(t => t._id !== tuitIdToDelete);
    res.sendStatus(200);
};

const updateTuit = (req, res) => {
    const tuitId = req.params.tid;
    const updates = req.body;
    // tuits = tuits.map(tuit => tuit._id === tuitId ? {...tuit, ...updates} : tuit);
    const tuitIndex = tuits.findIndex((t) => t._id === tuitId)
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};

    res.sendStatus(200);
};




export default TuitsController;




