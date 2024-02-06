import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import ToDoCard from "./ToDoCard";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { BoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypeColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: { [key in TypeColumn]: string } = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  const [searchString] = BoardStore((state) => [state.searchString]);

  let [openModal] = useModalStore((state) => [state.openModal]);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm bg-white ${
                  snapshot.isDraggingOver ? "bg-green-300" : "bg-white"
                }`}
              >
                <h2 className="flex justify-between p-2 text-xl fond-bold">
                  {idToColumnText[id]}
                  <span className="text-sm text-grey-200 bg-gray-100 rounded-full font-normal p-2">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className="space-y-2 ">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;

                    return (
                      <Draggable
                        key={todo.$id}
                        index={index}
                        draggableId={todo.$id}
                      >
                        {(provided) => (
                          <ToDoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex justify-end items-end p-2">
                    <button
                      onClick={openModal}
                      className="text-green-500 hover:text-green-600"
                    >
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
