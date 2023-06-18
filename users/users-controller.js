import e from 'express';
import * as usersDao from './users-dao.js';

const UserController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const findUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if(username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
        if(user) {
            res.json(user);
            return;
        }else {
            res.sendStatus(404);
        }   
    }  else if (username) {
        const user = await usersDao.findUserByUsername(username);
        if(user) {
            res.json(user);
            return;
        } else {
            res.sendStatus(404);
        }
    } else {
        const users = await usersDao.findAllUsers();
        res.json(users);
    }
}

const findUserById = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersDao.findUserById(userId);
    res.json(user);
}

const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
}

const deleteUser = async (req, res) => {
    const status = await usersDao.deleteUser(req.params.uid);
    res.json(status);
}

const updateUser = async (req, res) => {
    const userId = req.params.uid;
    const updates = req.body;
    return await usersDao.updateUser(userId, updates);
}
// const updateUser = async (req, res) => {
//     const id = req.params.id;
//     const status = await usersDao.updateUser(id, req.body);
//     const user = await usersDao.findUserById(id);
//     req.session["currentUser"] = user;
//     res.json(status);
// };
  

export default UserController;