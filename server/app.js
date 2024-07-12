import {config} from "dotenv"
import express from "express";
import { dbconnection } from "./database/dbconnection.js";
import bookRouter from "./router/bookRouter.js";
import cors from "cors"
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();
config({path: "./config/config.env"})


app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use("/book", bookRouter);
dbconnection();
app.use(errorMiddleware);
export default app;