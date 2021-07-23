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

    const body = await recommendationFactory.generateInvalidBodyAndPost();

    const result = await supertest(app).post("/recommendations").send(body);

    expect(result.body).toEqual(expect.objectContaining({
      
      
    }));
  });

});

