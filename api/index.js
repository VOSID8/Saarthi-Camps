const express = require("express");
require("dotenv").config();
const connectToDB = require("./dbConnect");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const client = require("prom-client");
const responseTime = require("response-time");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
// const path = require("path");

const { notFoundError, responseError } = require("./middlewares/errorHandler");
const { forceAuth, checkAuth } = require("./middlewares/authentication");
const { dataEntryOperatorOnly } = require("./middlewares/authorization");

const userRouter = require("./routes/user.routes");
const refugeeRouter = require("./routes/refugee.routes");
const orderRouter = require("./routes/order.routes");
const tokenRouter = require("./routes/token.routes");
const consultancyRouter = require("./routes/consultancy.routes");
// const staticRouter = require("./routes/static.router");

(async () => {
    try {
        await connectToDB();
        const app = express();
        // const publicPath = path.join(__dirname, "public");
        // console.log(publicPath);

        const collectDefaultMetrics = client.collectDefaultMetrics;
        collectDefaultMetrics({ register: client.register });

        const reqResTime = new client.Histogram({
            name: "http_express_req_res_time",
            help: "This tells how much time is taken by req and res",
            labelNames: ["method", "route", "status_code"],
            buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000]
        });
        const totalReqCounter = new client.Counter({
            name: "total_req",
            help: "tells total number of req"
        });
        const options = {
            transports: [
                new LokiTransport({
                    host: "http://127.0.0.1:3100"
                })
            ]
        };
        const logger = createLogger(options);

        app.use(responseTime((req, res, time) => {
            totalReqCounter.inc();
            reqResTime.labels({
                method: req.method,
                route: req.url,
                status_code: res.statusCode
            })
                .observe(time)
        })
        );
        app.use(cors());
        app.use(morgan("dev"));
        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(fileUpload({ useTempFiles: true }));
        app.use(checkAuth());
        // app.use(express.static(publicPath));
        // app.set("view engine", "ejs");
        // app.set("views", path.resolve("./api/views"));
        // app.use("/", (req, res, next) => {
        //     console.log(req.url, res.statusCode, req.method);
        //     next();
        // })

        app.use("/refugee", forceAuth());
        app.use("/refugee", dataEntryOperatorOnly());
        app.use("/order", forceAuth());
        app.use("/order", dataEntryOperatorOnly());
        app.use("/token", forceAuth());
        app.use("/consultancy", forceAuth());
        app.use("/consultancy", dataEntryOperatorOnly());
        app.use("/user", userRouter);
        app.use("/refugee", refugeeRouter);
        app.use("/order", orderRouter);
        app.use("/token", tokenRouter);
        app.use("/consultancy", consultancyRouter);
        // app.use("/", staticRouter);

        app.get("/metrics", async (req, res) => {
            res.setHeader("Content-Type", client.register.contentType);
            const metrics = await client.register.metrics();
            res.send(metrics);
        });

        app.get("/health", (req, res) => {
            logger.info("Hello from my express server" + `${req.url}`);
            res.send("Hi");
        })

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