import { Request, Response } from "express";
import { schemaPostRecommendation } from "../schemas/postRecommendation";
import * as recommendationsRepository from "../repositories/recommendationsRepository";
import * as recommendationsService from "../services/recommendationsService";

export async function postRecommendation (req: Request, res: Response) {
    try {
        const validBody = schemaPostRecommendation.validate(req.body);

        if (!validBody.error) {
            const { name, youtubeLink } = req.body;

            await recommendationsRepository.insertRecommendation(name, youtubeLink);

            res.sendStatus(201);
        } else {
            res.sendStatus(422);
        }

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function upvoteRecommendation (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await recommendationsService.upvote(id);
        res.send(result);      

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}