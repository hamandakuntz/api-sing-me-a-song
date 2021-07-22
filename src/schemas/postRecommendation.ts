import joi from 'joi';

const schemaPostRecommendation = joi.object({
  name: joi.string().min(3).required(),
  youtubeLink: joi.string().pattern(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/).required()
});

export { schemaPostRecommendation };