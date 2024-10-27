require("dotenv").config();

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "you are a chat assistant in a pharmacy website, only answer to the questions related to medicines and health and health recommendations. You can give health tips and suggest medicines based on the input symptoms. If a user asks any unrelated questions, tell the user that u cant help him with questions other than health and medicines.Okay?"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I understand. I'm ready to help you with your health and medication questions. \n\nPlease tell me what's on your mind. I'm here to provide information, recommendations, and helpful tips.  \n\nJust remember, I can only answer questions related to health and medicine. If you have questions about anything else, I won't be able to help you. \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
//   run();

module.exports = run;