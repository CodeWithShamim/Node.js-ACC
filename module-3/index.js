const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const toolsRoutes = require("./routes/v1/tools.route");
const { connectToServer } = require("./utils/database");
// const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
// app.use(express.static("views"))
app.set("view engine", "ejs");

connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log("server is running....");
        });

    }
    else {
        console.log("Error", error);
    }
})

// app.use(viewCount);

app.use("/api/v1/tools", toolsRoutes)

app.all("*", (req, res) => {
    res.send("Not found");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});