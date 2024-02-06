import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Process a POST request
    const { todos } = req.body; // Use req.body instead of req.json()

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Say Hello for user and wish him enjoy this application for planning which coded by Mariia Shulezhko",
        },
        {
          role: "user",
          content: `Hi there, provide summary of the following ToDos. Count how many todos are in each category such as To Do, In progress and Done, then tell the user to have a productive day! Heres's the data ${JSON.stringify(
            todos
          )}   `,
        },
      ],
    });

    return res.status(200).json({
      message: "API route response",
      contentObj: completion.choices[0].message.content,
    });
  } else {
    // Handle any other HTTP method
  }
}
