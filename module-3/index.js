const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const toolsRoutes = require("./routes/v1/tools.route");
const { database } = require("./utils/database");

app.use(cors());
app.use(express.json());

database();

app.use("/api/v1/tools", toolsRoutes)

app.all("*", (req, res) => {
    res.send("Not found");
});
app.listen(port, () => {
    console.log("server is running....");
});