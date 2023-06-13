import people from "./users.js";

let users = people;

const UserController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    // app.put('/api/users/:uid', updateUser);
}

const findUsers = (req, res) => {
    // res.json(users)
    const type = req.query.type;
    if(type) {
        const userofType = users.filter(u => u.type === type);
        res.json(userofType);
        return;
    }
    res.json(users)
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user);
}

const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + "";
    users.push(newUser);
    res.json(newUser);
}

const deleteUser = (req, res) => {
    const userId = req.params.uid;
    // const index = users.findIndex(u => u._id === userId);
    // users.splice(index, 1);
    users = users.filter(usr => usr._id !== userId);
    res.sendStatus(200);
}

const updateUser = (req, res) => {
    const username = req.body.username;
    const updates = req.body;
    users = users.map(usr => usr.username === username ? {...usr, ...updates} : usr);
    res.json(updates);
}

export default UserController;