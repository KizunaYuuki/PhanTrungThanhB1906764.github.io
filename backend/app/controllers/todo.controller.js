// exports
const TodoService = require("../services/todo.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const store = require('amplify-store');

// Create and save a new todo
// exports.create = async (req, res, next) => {
//     if (!req.body?.name) {
//         return next(new ApiError(400, "Name can not be empty"));
//     }

//     try {
//         const todoService = new TodoService(MongoDB.client);
//         const document = await todoService.create(req.body);
//         return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while creating the todo")
//         );
//     }
// };

exports.create = async (req, res, next) => {
    if(store("username")) {
        if (!req.body?.name) {
            return next(new ApiError(400, "Name can not be empty"));
        }
        try {
            const todoService = new TodoService(MongoDB.client);
            const document = await todoService.create(req.body);
            return res.send(document);
        } catch (error) {
            return next(
                new ApiError(500, "An error occurred while creating the todolist")
            );
        }
    } else {
        console.log("Error login, username empty")
        return res.send("Error login, username empty")   
    }
};

// Retrieve all todos of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    
    try {
        const todoService = new TodoService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await todoService.findByName(name);
        } else {
            // documents = await todoService.find({});
            documents = await todoService.findAllTodolistByUer();
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving todos")
        );
    }
    
    return res.send(documents);
};

// Find a single todo with an id
exports.findOne = async (req, res, next) => {
    try {
        const todoService = new TodoService(MongoDB.client);
        const document = await todoService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Todo not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving todo with id=${req.params.id}`
            )
        );
    }
};

// Update a todo by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const todoService = new TodoService(MongoDB.client);
        const document = await todoService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Todo not found"));
        }
        return res.send({ message: "Todo was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating todo with id=${req.params.id}`)
        );
    }
};

// Delete a todo with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const todoService = new TodoService(MongoDB.client);
        const document = await todoService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Todo not found"));
        }
        return res.send({ message: "Todo was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, `Could not deleted todo with id=${req.params.id}`
            )
        );
    }
};

// Delete all todos of a user from the database
exports.deleteAll = async (req, res, next) => {
    try {
        const todoService = new TodoService(MongoDB.client);
        const deletedCount = await todoService.deleteAll();
        return res.send({
            message: `${deletedCount} todolist were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all todos")
        );
    }
};

// Find All favorite todos of a user
exports.findAllFavorite = async (req, res, next) => {
    try {
        const todoService = new TodoService(MongoDB.client);
        const documents = await todoService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500, "An error occurred while retrieving favorite todos"
            )
        );
    }
};

// Find All complete todolists of a user
exports.findAllComplete = async (req, res, next) => {
    try {
        const todoService = new TodoService(MongoDB.client);
        const documents = await todoService.findComplete();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500, "An error occurred while retrieving complete todolists"
            )
        );
    }
};

// 
exports.findAllTodolistByUer = async (req, res, next) => {
    let documents = [];
    try {
        const todoService = new TodoService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await todoService.findByName(name);
        } else {
            documents = await todoService.findAllTodolistByUer();
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving todolists")
        );
    }
    
    return res.send(documents);
}