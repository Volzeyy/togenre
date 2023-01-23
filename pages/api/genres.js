import { configuration } from "@/utils/openai";
import { OpenAIApi } from "openai";

const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
    const { textInput, selectedGenre } = req.body; 

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Convert the following text so that it's like in ${selectedGenre ? selectedGenre : "random"} literary genre: ${textInput}`,
        max_tokens: 400,
        temperature: 1,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
    })

    const output = response.data?.choices?.[0].text 

    if (output === undefined) throw Error("No text generated :(");

    res.status(200).json({ output: output });
}