import * as usersDao from "./users-dao.js";

const AuthController = (app) => {

    const register = async (req, res) => {
        const username = req.body.username;
        const user = await usersDao.findUserByUsername(username);
        if(user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session['currentUser'] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if(username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if(user) {
                req.session['currentUser'] = user;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
        
    };

    const profile = async (req, res) => {
        const currentUser = req.session['currentUser'];
        if(currentUser) {
            const updatedUser = await usersDao.findUserByUsername(currentUser.username);
            if (updatedUser === currentUser) {
                res.json(currentUser);
            } else {
                res.json(updatedUser);
            }
        } else {
            res.sendStatus(404);
        }

    };
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
        const currentUser = req.session['currentUser'];
        if(currentUser) {
            const updates = req.body;
            const status = await usersDao.updateUser(currentUser._id, updates);
            const user = await usersDao.findUserById(currentUser._id);
            req.session['currentUser'] = user;
            res.json(status);
            return;
        }
        res.sendStatus(403);
    };


    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users", update);

    
};

export default AuthController;