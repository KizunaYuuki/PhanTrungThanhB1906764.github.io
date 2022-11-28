const express = require('express');
const todos = require('../controllers/todo.controller');
const user = require('../controllers/user.controller');


const router = express.Router();

router.route('/')
    .get(todos.findAll)
    .post(todos.create)
    .delete(todos.deleteAll);

router.route('/loginshow')
    .get(user.AllUserShow);

router.route('/findAllTodolistByUer')
    .get(todos.findAllTodolistByUer);

router.route('/login')
    .post(user.authenticate);
router.route('/logout')
    .get(user.logout);

router.route('/register')
    .post(user.register);

// router.route('/complete')
//     .get(todolist.findAllComplete);

// router.route('/favorite')
//     .get(todos.findAllFavorite);

router.route('/:id')
    .get(todos.findOne)
    .put(todos.update)
    .delete(todos.delete);

module.exports = router;