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

    await recommendationsRepository.downvote(id, newScore);
}

export async function getRecommendations () {
    const percentage = Math.random();
    const checkTableRows = await recommendationsRepository.checkTheRecommendationsTable();
    let responseObj = {};
    let response = null;

    if(checkTableRows !== 0) {
        if(percentage > 0.7) {
            //só acontece 30% das vezes
            const percent = 30;
            response = await recommendationsRepository.getRecommendationsPercent(percent);
            console.log("30 por cento");                         
        } else if (percentage < 0.7){
            //acontece 70% das vezes
            const percent = 70;
            response = await recommendationsRepository.getRecommendationsPercent(percent);      
            console.log("70 por cento");
        } else {           
            response = await recommendationsRepository.getRecommendationsPercent();   
            console.log("musica sorteada")     
        }

        responseObj = response.map((i) => {
            return {
                id: i.id,
		        name: i.name,
		        youtubeLink: i.youtubeLink,
		        score: i.score
            };
        });     
        
        return responseObj;
    } else {
        return false;
    }    
}

export async function getTopRecommendations (amount: number) {
    return await recommendationsRepository.getTopRecommendations(amount);
}