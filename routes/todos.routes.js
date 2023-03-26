let express = require("express");
let todoRouter = express.Router();
let jwt = require("jsonwebtoken");

let { TodoModel } = require("../model/todos.model");

todoRouter.post("/add", async (req, res) => {
  try {
    let todo = new TodoModel(req.body);
    await todo.save();
    res.status(200).send({ msg: "todos has been added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

todoRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;
  let decoded = jwt.verify(token, "tmrow");
  try {
    if (decoded) {
      let todos = await TodoModel.find({ user: decoded.userID });
      res.status(200).send({ msg: `Here are all the todos `, todos });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

todoRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let todo = await TodoModel.find({ _id: id });
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

todoRouter.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  try {
    await TodoModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "todos has been updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

todoRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await TodoModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "todos has been updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  todoRouter,
};
