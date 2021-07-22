import * as recommendationsRepository from "../repositories/recommendationsRepository";

export async function upvote (id: number) {
    let score = await recommendationsRepository.getScore(id);

    let newScore = score+1; 

    await recommendationsRepository.upvote(id, newScore);
}

export async function downvote (id: number) {
    let score = await recommendationsRepository.getScore(id);

    let newScore = score-1; 

    if(newScore <= -5) {
        await recommendationsRepository.deleteRecommendation(id);        
    }

    await recommendationsRepository.downvote(id, newScore);
}
