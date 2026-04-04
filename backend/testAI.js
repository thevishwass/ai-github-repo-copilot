const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function test() {
  const res = await client.chat.completions.create({
    model: "deepseek/deepseek-chat",
    messages: [{ role: "user", content: "Say hello." }]
  });

  console.log(res.choices[0].message.content);
}

test();