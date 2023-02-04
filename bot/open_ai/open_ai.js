import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
export const baseDialogConfig = {
  model: "text-davinci-003",
  max_tokens: 2000,
  temperature: 1,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0.0,
};
export default openai;
