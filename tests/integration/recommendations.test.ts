import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import * as recommendationFactory from "../factories/recommendationFactory";
import * as utils from "../utils/database";
import { schemaPostRecommendation } from "../../src/schemas/postRecommendation";

beforeEach(utils.cleanDatabase);
afterAll(utils.endDatabaseConnection);

describe("post /recommendations", () => {
  it("should answer status 201 for a created recommendation", async () => {

    const body = await recommendationFactory.generateValidBodyAndPost();

    const result = await supertest(app).post("/recommendations").send(body);

    expect(result.status).toEqual(201);
  });

  it("should answer status 422 for a invalid body", async () => {

    const body = await recommendationFactory.generateInvalidBodyAndPost();

    const result = await supertest(app).post("/recommendations").send(body);

    expect(result.status).toEqual(422);
  });  
});

describe("post /recommendations/:id/upvote", () => {
  it("should answer an updated object when an upvote is send", async () => {

    await recommendationFactory.generateUpvote();

    const result = await supertest(app).post(`/recommendations/1/upvote`);

    expect(result.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      youtubeLink: expect.any(String),      
      score: expect.any(Number)            
    }));
  });
});

describe("post /recommendations/:id/downvote", () => {
  it("should answer an updated object when a downvote is send", async () => {

    await recommendationFactory.generateDownvote();

    const result = await supertest(app).post(`/recommendations/1/downvote`);

    expect(result.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      youtubeLink: expect.any(String),      
      score: expect.any(Number)            
    }));
  });
});

describe("get /recommendations/random", () => {
  it("should answer an with an object containing all of recommendations randomcally", async () => {

    await recommendationFactory.generateMusicRecommendation();

    const result = await supertest(app).get(`/recommendations/random`);

    expect(result.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      youtubeLink: expect.any(String),      
      score: expect.any(Number)            
    }));
  });

  it("should answer 404 for an empty recommendation table", async () => {

    await recommendationFactory.checkTheRecommendationsTable();

    const result = await supertest(app).get(`/recommendations/random`);

    expect(result.status).toEqual(404);
  });
});

describe("get /recommendations/top/:amount", () => {
  it("should answer the list of recommendations", async () => {

    await recommendationFactory.getTopRecommendations();

    const result = await supertest(app).get(`/recommendations/top/3`);

    expect(result.body).toEqual([
      { id: 3, name: "Test Music", youtubeLink: "https://www.youtube.com/", score: 5 },
      { id: 2, name: "Test Music", youtubeLink: "https://www.youtube.com/", score: 4 },
      { id: 1, name: "Test Music", youtubeLink: "https://www.youtube.com/", score: 3 },
    ]);
  });
});
