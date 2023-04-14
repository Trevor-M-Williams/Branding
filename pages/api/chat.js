import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const data = JSON.parse(req.body);
  const { industry, companyName } = data.formValues;
  const {
    femininemasculine,
    playfulserious,
    luxuriousaffordable,
    modernclassic,
    youthfulmature,
    loudsubdued,
  } = data.formValues.traits;
  const prompt = `
    Generate a brand identity for a company in the ${industry} industry with the following traits: 
    ${femininemasculine}, ${playfulserious}, ${luxuriousaffordable}, ${modernclassic}, ${youthfulmature}, ${loudsubdued}.
    The company name is ${companyName}.
    Also generate a color palette (3 colors - base, accent, neutral) and provide reasoning for each color.
    The response should be in the following form:
    [Company Name] Brand Identity/end/
    Tagline: [tagline]/end/
    Typography: [description of the ideal font with examples]/end/
    Primary Color: [hex code - explanation]/end/
    Accent Color: [hex code - explanation]/end/
    Neutral Color: [hex code - explanation]/end/
    Summary: [high level description of the brand in 4-5 sentences]
    include /end/ where indicated
  `;
  // console.log(prompt);
  // res.status(200).json({ prompt });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    res
      .status(200)
      .json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
