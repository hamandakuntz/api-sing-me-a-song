import express from "express";
import cors from "cors";
import connection from "./database";
import * as recommendationsController from "./controllers/recommendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationsController.postRecommendation);
app.post("/recommendations/:id/upvote", recommendationsController.upvoteRecommendation)

export default app;
