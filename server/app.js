const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;

const childController = require("./controller/child");
const taskController = require("./controller/task");
const monthlyController = require("./controller/monthly");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
    res.send('Hello World!')
  })
  
  app.use(cors());

  app.use("/child", childController);
  app.use("/task", taskController);
  app.use("/monthly", monthlyController);
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})