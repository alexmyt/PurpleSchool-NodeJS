import express from "express";

import { appConfig } from "./api/config.service.js";
import apiRouter from "./api/api.router.js";

appConfig.readConfig();

const port = 8000;
const app = express();

app.use(express.json());
app.use('/', apiRouter);

app.use((err, req, resp, next) => {
  resp.status(500).json({message: err?.message});
})

app.listen(port, () => {
  console.log(`Listen at http://localhost:${port}`);
})
