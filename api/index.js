const express = require("express");
require("dotenv").config();
const connectToDB = require("./dbConnect");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { notFoundError, responseError } = require("./middlewares/errorHandler");
const { forceAuth, checkAuth } = require("./middlewares/authentication");
const { dataEntryOperatorOnly } = require("./middlewares/authorization");

const userRouter = require("./routes/user.routes");
const refugeeRouter = require("./routes/refugee.routes");
const orderRouter = require("./routes/order.routes");
const tokenRouter = require("./routes/token.routes");

(async () => {
    try {
        await connectToDB();
        const app = express();

        app.use(morgan("dev"));
        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        
        app.use(checkAuth());
        app.use("/refugee", forceAuth());
        app.use("/refugee", dataEntryOperatorOnly());
        app.use("/order", forceAuth());
        app.use("/order", dataEntryOperatorOnly());
        app.use("/token", forceAuth());

        app.use("/user", userRouter);
        app.use("/refugee", refugeeRouter);
        app.use("/order", orderRouter);
        app.use("/token", tokenRouter);

        app.use(notFoundError);
        app.use(responseError);

        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.error(`Error connecting to database ${error}`);
    }
})();