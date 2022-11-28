const { ObjectId } = require("mongodb");
const store = require('amplify-store');

class TodoService {
    constructor(client) {
        this.Todo = client.db("todolistProject").collection("todolists");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractTodoData(payload) {
        const todo = {
            name: payload.name,
            // email: payload.email,
            address: payload.address,
            // phone: payload.phone,
            // favorite: payload.favorite,
            // add 
            username: payload.username,
            complete: payload.complete,
            content: payload.content,
            important: payload.important,
            tags: payload.tags,
            date: payload.date,
            url: payload.url,
        };
        // remove undefined fields
        Object.keys(todo).forEach(
            (key) => todo[key] === undefined && delete todo[key]
        );
        return todo;
    }

    async create(payload) {
        const todo = this.extractTodoData(payload);
        const result = await this.Todo.findOneAndUpdate(
            todo,
            { $set: { complete: todo.complete === true, username: store( "username" ) } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Todo.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Todo.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findAllTodolistByUer() {
        const cursor = await this.Todo.find({ "username": store("username") });
        return await cursor.toArray();
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractTodoData(payload);
        const result = await this.Todo.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Todo.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        // const result = await this.Todo.deleteMany({});
        const result = await this.Todo.deleteMany({ "username": store("username") });
        return result.deletedCount;
    }
}
module.exports = TodoService;