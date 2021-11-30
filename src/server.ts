import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import "dotenv/config";

import { routes } from "./routes";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
