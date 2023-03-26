let mongoose = require("mongoose");

let todoSchema = mongoose.Schema(
  {
    todo: String,
    timeInHrs: Number,
    importance: String,
    completed: Boolean,
    user: String,
  },
  {
    versionKey: false,
  }
);

let TodoModel = mongoose.model("todo", todoSchema);

module.exports = {
  TodoModel,
};
