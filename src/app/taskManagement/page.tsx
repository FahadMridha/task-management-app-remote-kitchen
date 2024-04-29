"use client";
import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import { useGetTasksQuery } from "@/redux/features/task/taskApi";
import React from "react";

const TaskManagement = () => {
  const { data, isLoading } = useGetTasksQuery(undefined);
  console.log(data);
  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <p>Loading.........</p>
      </div>
    );
  }
  return (
    <div className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
      <h1 className='text-2xl font-bold my-5'> Manage your task</h1>
        <AddTask />
      </div>
      <div>
        <TaskList tasks={data} />
      </div>
    </div>
  );
};

export default TaskManagement;
