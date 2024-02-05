"use client";
// import dynamic from "next/dynamic";

import { BoardStore } from "@/store/BoardStore";
import React, { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import Column from "./Column";

function Board() {
  const [getBoard, board, setBoardState, updateToDoInDB] = BoardStore(
    (state) => [
      state.getBoard,
      state.board,
      state.setBoardState,
      state.updateToDoInDB,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log("destination");
    console.log(destination);
    console.log(source);
    console.log(type);

    //check if user dragged card outside of board
    if (!destination) return;

    //handle column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      console.log("rearrangedColumns");
      console.log(rearrangedColumns);
      console.log(removed);
      setBoardState({ ...board, columns: rearrangedColumns });
    }

    //this step is needed as the indexes are stored as number 0, 1, 2 instead ids with DND library
    if (type === "card") {
      const columns = Array.from(board.columns);
      const startColIndex = columns[Number(source.droppableId)];
      const finishColIndex = columns[Number(destination.droppableId)];

      const startCol: Column = {
        id: startColIndex[0],
        todos: startColIndex[1].todos,
      };

      const finishCol: Column = {
        id: finishColIndex[0],
        todos: finishColIndex[1].todos,
      };

      if (!startCol || !finishCol) return;

      if (startColIndex === finishColIndex && startCol === finishCol) return;

      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 1);

      if (startCol.id === finishCol.id) {
        // same column task drag
        newTodos.splice(destination.index, 0, todoMoved);

        const newCol: Column = {
          id: startCol.id,
          todos: newTodos,
        };

        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);

        setBoardState({ ...board, columns: newColumns });
      } else {
        //dragging to another column
        const finishTodos = Array.from(finishCol.todos);
        finishTodos.splice(destination.index, 0, todoMoved);

        const newCol: Column = {
          id: startCol.id,
          todos: newTodos,
        };

        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });

        console.log("update in DB");
        console.log(todoMoved, finishCol.id);
        setBoardState({ ...board, columns: newColumns });
        //update in DB
        updateToDoInDB(todoMoved, finishCol.id);
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column id={id} key={id} todos={column.todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
