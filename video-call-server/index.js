const express = require("express");
require("dotenv").config();
const connectToDB = require("../api/dbConnect");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

(async () => {
    try {
        await connectToDB();
        const app = express();
        const publicPath = path.join(__dirname, "public");
        console.log(publicPath);

        app.use(cors());
        app.use(morgan("dev"));
        app.use(express.static(publicPath));
        app.set("view engine", "ejs");
        app.set("views", path.resolve("./views"));

        app.get("/:channel/:token1", (req, res) => {
            res.render("home")
        })
        app.get("/:channel/:token1/:token2", (req, res) => {
            res.render("home")
        })
        app.get("/:channel/:token1/:token2/:token3", (req, res) => {
            res.render("home")
        })

        const port = process.env.PORT || 8081;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.error(`Error connecting to database ${error}`);
    }
})();