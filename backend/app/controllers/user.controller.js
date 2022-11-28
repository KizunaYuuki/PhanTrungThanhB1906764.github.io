'use strict';

// exports
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const store = require('amplify-store');

// create and save a new user ~ register
exports.register = async (req, res, next) => {
    if (!req.body?.username || !req.body?.password) {
        return next(new ApiError(400, "username or password can not be empty"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.register(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};

// Retrieve all users of a user from the database
exports.AllUserShow = async (req, res, next) => {
    let documents = [];
    
    try {
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving users")
        );
    }
    
    return res.send(documents);
};

exports.authenticate = async (req, res, next) => {
    const userService = new UserService(MongoDB.client);
    const document = await userService.authenticate(req.body)
        // .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        // .catch(err => next(err));
    if(document) {
        store( "username", document.username );
        return res.send(document);
    }
    // stop
    // else
    //     return res.send("username or password not match");
}

exports.logout = async (req, res, next) => {
    if(store( "username" )) {
        // store.storageType("username", store( "username" ));
        console.log("Logout account " + store("username") + " completed")
        let temp = store("username")
        store("username", null)
        return res.send("Logout account " + temp + " completed")
    } else return res.send("Logout fail");

}