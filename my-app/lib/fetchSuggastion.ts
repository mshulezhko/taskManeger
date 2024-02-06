import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);
  console.log(" const todos = formatTodosForAI(board);");
  console.log(todos);

  const res = await fetch("/api/routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

  const GPTData = await res.json();
  const { contentObj } = GPTData;

  console.log("const { content } = GPTData;");
  console.log(contentObj);

  return contentObj;
};

export default fetchSuggestion;
