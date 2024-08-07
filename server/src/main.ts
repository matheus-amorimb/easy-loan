import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import loanRouter from "./ui/routes/LoanRoutes";
import authRouter from "./ui/routes/AuthRoutes";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_VERSION = "v2";

app.use(cors());
app.use(bodyParser.json());
app.use(`/${API_VERSION}/loans`, loanRouter);
app.use(`/${API_VERSION}/auth`, authRouter);
app.use(`/${API_VERSION}/health`, (req: Request, res: Response) =>
  res.status(200).json("Ok")
);
app.use(`/${API_VERSION}/timestamp`, (req: Request, res: Response) =>
  res.status(200).json(new Date().toLocaleString())
);

app
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
