"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ITask } from "../../types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import {
  useDeleteTaskMutation,
  useEditTaskMutation,
} from "@/redux/features/task/taskApi";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [priorityToEdit, setPriorityToEdit] = useState<string>(task.priority);
  const [statusToEdit, setStatusToEdit] = useState<string>(task.status);

  console.log(taskToEdit, priorityToEdit, statusToEdit);
  const [editTask, { isLoading, error, isSuccess, reset }] =
    useEditTaskMutation();

  const [deleteTask] = useDeleteTaskMutation();

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTask({
      id: task.id,
      text: taskToEdit,
      status: statusToEdit,
      priority: priorityToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskProps>();
  const onSubmit: SubmitHandler<TaskProps> = (data) => console.log(data);

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="w-full">{task.status}</td>
      <td className="w-full">{task.priority}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <input
                value={statusToEdit}
                onChange={(e) => setStatusToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <input
                value={priorityToEdit}
                onChange={(e) => setPriorityToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
