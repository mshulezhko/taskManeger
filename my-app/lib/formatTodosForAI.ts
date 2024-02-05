const formatTodosForAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArr = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TypeColumn]: Todo[] });

  //reduce to key, value, length
  const newFlatArr = Object.entries(flatArr).reduce((map, [key, value]) => {
    map[key as TypeColumn] = value.length;
    return map;
  }, {} as { [key in TypeColumn]: number });

  return newFlatArr;
};

export default formatTodosForAI;
