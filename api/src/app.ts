import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import deserializeUser from "./middlewares/deserializeUser";

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(deserializeUser);

app.use("/api", router);

export default app;