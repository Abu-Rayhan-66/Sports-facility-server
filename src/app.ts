import { Application, Request, Response } from "express";
import express from "express"
import cors from "cors"
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";



const app: Application = express();

//parsers
app.use(express.json());

app.use(cors());

// application routes
app.use("/api/", router);

app.get('/', (req: Request, res: Response) => {
    res.send('welcome to the server')
  })

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
