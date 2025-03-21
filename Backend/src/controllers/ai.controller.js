import aiService from "../services/ai.service.js";

export const getReview = async (req, res) => {
  const code = req.body.code;
  const apiKey = process.env.GOOGLE_GEMINI_KEY; 

  if (!code) {
    return res.status(400).send("Code is required");
  }
  const response = await aiService(code,apiKey);
  console.log(response)
  return res.send(response);
};

