"use client";

import { FormEvent, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { BoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/16/solid";

function Modal() {
  const imagePickerRefer = useRef<HTMLInputElement>(null);
  const [addTask, image, setImage, newTaskValue, setNewTaskInput, newTaskType] =
    BoardStore((state) => [
      state.addTask,
      state.image,
      state.setImage,
      state.newTaskValue,
      state.setNewTaskInput,
      state.newTaskType,
    ]);

  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTaskValue) return;

    //add task
    addTask(newTaskValue, newTaskType, image);

    setImage(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10 "
        onClose={closeModal}
      >
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-x-full items-center justify-center p-4 text-center h-screen	">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg found-medium leading-6 text-grey-900 pb-2"
                >
                  Add a task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskValue}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here ..."
                    className="w-full border border-grey-300 rounded-md outline-none p-5"
                  />
                </div>
                <TaskTypeRadioGroup />
                <div>
                  {image && (
                    <Image
                      width={200}
                      height={200}
                      alt="Task image"
                      src={URL.createObjectURL(image)}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all cursor-not-allowed duration-150 "
                      onClick={() => setImage(null)}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      imagePickerRefer.current?.click();
                    }}
                    className="w-full border rounded border-gray-400 p-5 cursor-pointer"
                  >
                    <PhotoIcon className="w-6 h-6 mr-2 inline-block" /> Upload
                    Image
                  </button>
                  <input
                    type="file"
                    ref={imagePickerRefer}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newTaskValue}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-small font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
