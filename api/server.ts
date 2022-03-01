require("dotenv").config();
import app from "./src/app";
import config from "config";

const port = config.get("port");

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
}); 