import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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

  console.log(req.body);

  // try {
  //   const completion = await openAi.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: input }],
  //   })
  //   res.status(200).json({ result: completion.data.choices[0].text });
  // } catch (error) {
  //   if (error.response) {
  //     console.error(error.response.status, error.response.data);
  //     res.status(error.response.status).json(error.response.data);
  //   } else {
  //     console.error(`Error with OpenAI API request: ${error.message}`);
  //     res.status(500).json({
  //       error: {
  //         message: "An error occurred during your request.",
  //       },
  //     });
  //   }
  // }
}
