let express = require("express");
let app = express();
let cors = require("cors");
require("dotenv").config();

const { connection } = require("./db");
const { todoRouter } = require("./routes/todos.routes");
const { userRouter } = require("./routes/users.routes");
const { auth } = require("./middlewares/auth.middleware");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/todos", todoRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to MongoAtlas DB");
  } catch (error) {
    console.log("Not able to connect to DB");
  }
  console.log(`Server is live at ${process.env.port} port`);
});
