import React, { useEffect, useState } from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";
import { XCircleIcon } from "@heroicons/react/16/solid";
import getUrl from "@/lib/getUrl";
import { BoardStore } from "@/store/BoardStore";
import Image from "next/image";

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
  const deleteTask = BoardStore((state) => state.deleteTask);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImg = async () => {
        const url = await getUrl(todo.image!);

        if (url) {
          setImgUrl(url.toString());
        }
      };

      fetchImg();
    }
  }, [todo]);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white drop-shadow-md rounded-lg"
    >
      <div className="flex align-top justify-between p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="h-5 w-5" />
        </button>
      </div>

      {/* add img here */}
      {imgUrl && (
        <div className="h-full w-full rounded-b-mb">
          <Image
            className="w-full object-contain rounded-b-md"
            width={400}
            height={200}
            src={imgUrl}
            alt="Task image"
          />
        </div>
      )}
    </div>
  );
};

export default ToDoCard;
