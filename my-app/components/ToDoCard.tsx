import React from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";
import { XCircleIcon } from "@heroicons/react/16/solid";

//   todo={todo}
//                             index={index}
//                             id={id}
//                             innerRef={provided.innerRef}
//                             draggableProps={provided.draggableProps}
//                             dragHandleProps={provided.dragHandleProps}

type Props = {
  todo: Todo;
  index: number;
  id: TypeColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const ToDoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) => {
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white drop-shadow-md rounded-lg"
    >
      <div className="flex align-top justify-between p-5">
        <p>{todo.title}</p>
        <button className="text-red-500 hover:text-red-600">
          <XCircleIcon className="h-5 w-5" />
        </button>
      </div>

      {/* add img here */}
    </div>
  );
};

export default ToDoCard;
