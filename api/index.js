const express = require("express");
require("dotenv").config();
const connectToDB = require("./dbConnect");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

(async () => {
    await connectToDB();
    const app = express();

    app.use(morgan("dev"));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
    });
})();