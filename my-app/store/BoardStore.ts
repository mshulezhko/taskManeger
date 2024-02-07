import { ID, databases, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";

interface BoardState {
  board: Board;
  newTaskValue: string;
  newTaskType: TypeColumn;
  image: File | null;
  addTask: (todo: string, columnId: TypeColumn, image: File | null) => void;
  deleteTask: (taskIndex: number, todo: Todo, id: TypeColumn) => void;
  setImage: (image: File | null) => void;
  setNewTaskType: (columnId: TypeColumn) => void;
  setNewTaskInput: (e: string) => void;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateToDoInDB: (todo: Todo, columnId: TypeColumn) => void;
  searchString: string;
  setSearchString: (string: string) => void;
}

export const BoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypeColumn, Column>(),
  },
  newTaskValue: "",
  newTaskType: "todo",
  image: null,
  setNewTaskInput: (e) => set({ newTaskValue: e }),
  deleteTask: async (taskIndex, todo, id) => {
    const newColumn = new Map(get().board.columns);
    //delete from new column
    newColumn.get(id)?.todos.splice(taskIndex, 1);

    set({ board: { columns: newColumn } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  addTask: async (todo, columnId, image) => {
    let file: Image | undefined;

    console.log("fileUploaded +++++++");
    console.log(todo);
    console.log(columnId);
    console.log(image);

    if (image) {
      const fileUploaded = await uploadImage(image);
      console.log("fileUploaded +++++++22222");
      console.log(fileUploaded);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({ newTaskValue: "" });

    set((state) => {
      const newColumn = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo.toString(),
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumn.get(columnId);

      if (!column) {
        newColumn.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumn.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumn,
        },
      };
    });
  },

  setImage: (image) => set({ image }),
  setNewTaskType: (columnId) => set({ newTaskType: columnId }),

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();

    set({ board });
  },
  setBoardState: (board) => {
    set({ board });
  },
  updateToDoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  searchString: "",
  setSearchString: (string) => set({ searchString: string }),
}));
