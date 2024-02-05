import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const { todos } = await request.json();
  const client = new OpenAI();

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

  console.log("export async function POST");
  console.log(todos);
  return NextResponse.json(completion.choices[0].message);
}

// const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }

// main();
