import * as recommendationsRepository from "../repositories/recommendationsRepository";

export async function upvote (id: number) {
    let score = await recommendationsRepository.getScore(id);

    let newScore = score+1; 

    return await recommendationsRepository.upvote(id, newScore);
}

export async function downvote (id: number) {
    let score = await recommendationsRepository.getScore(id);

    let newScore = score-1; 

    if(newScore <= -5) {
        await recommendationsRepository.deleteRecommendation(id);        
    }

    return await recommendationsRepository.downvote(id, newScore);
}

export async function getRecommendations () {
    const percentage = Math.random();
    const checkTableRows = await recommendationsRepository.checkTheRecommendationsTable();
    let response = null;
    let result = null;

    if(checkTableRows !== 0) {
        if(percentage > 0.7) {
            //só acontece 30% das vezes
            console.log("30 por cento");                         

            const percent = 30;
            result = await recommendationsRepository.getRecommendationsPercent(percent);

            if(!!result) {
                console.log("entrei no randomico 30%")
                response = recommendationsRepository.getRecommendationRandomically();                 
            } else {
                response = result;
            }   

        } else if (percentage < 0.7){
            //acontece 70% das vezes
            console.log("70 por cento");

            const percent = 70;            
            result = await recommendationsRepository.getRecommendationsPercent(percent);                      

            if(!!result) {
                console.log("entrei no randomico 70%")
                response = recommendationsRepository.getRecommendationRandomically();                 
            } else {
                response = result;
            }        
        }         
        
        return response;
    } else {
        return false;
    }    
}

export async function getTopRecommendations (amount: number) {
    return await recommendationsRepository.getTopRecommendations(amount);
}