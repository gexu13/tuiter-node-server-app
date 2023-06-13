let users = [
    {
        "firstName": "Alice",
        "lastName": "Wonderland",
        "username": "alice",
        "password": "alice",
    },
    {
        "firstName": "Bob",
        "lastName": "Hope",
        "username": "bob",
        "password": "bob",
    },
    {
        "firstName": "Charlie",
        "lastName": "Brown",
        "username": "charlie",
        "password": "charlie",
    }
];

export const findAllUsers = () => {
    return users;
};


export const findUserById = (uid) => {
 const index = users.findIndex((u) => u._id === uid);
 if (index !== -1) return users[index];
 return null;
};


export const findUserByUsername = (username) => {
 const index = users.findIndex((u) => u.username === username);
 if (index !== -1) return users[index];
 return null;
};


export const findUserByCredentials = (username, password) => {
 const index = users.findIndex((u) => u.username === username && u.password === password);
 if (index !== -1) return users[index];
 return null;
};


export const createUser = (user) => {users.push(user)
                                 return user;
                                };


export const updateUser = (username, user) => {
 const index = users.findIndex((u) => u.username === username);
 users[index] = { ...users[index], ...user };
 return {status: 'ok'}
};


export const deleteUser = (uid) => {
 const index = users.findIndex((u) => u._id === uid);
 users.splice(index, 1);
 return {status: 'ok'}
};


