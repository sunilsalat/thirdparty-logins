const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user._id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const createTodo = async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({
        userId: req.user._id,
        title,
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
};

module.exports = { getAllTodos, createTodo };
