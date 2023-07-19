import React, { useEffect, useState } from "react";
import "./wrapper.scss";
import Form from "../Form/Form";
import Task from "../Task/Task";
import EditForm from "../EditForm/EditForm";
const Wrapper = () => {
  const [taskList, setTaskList] = useState([]);
  const [taskEditing, setTaskEditing] = useState("");
  const [taskEditingId, setTaskEditingId] = useState(null);
  const [editFormVisible, setEditVisible] = useState(false);
  const [dragStartIndex, setdragStartIndex] = useState(null);
  const addTask = (task) => {
    setTaskList([...taskList, task]);
  };

  const removeTask = (index) => {
    console.log("index>>>", index);
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    console.log("newTaskList>>>", newTaskList);
    setTaskList(newTaskList);
  };

  const editTask = (index, task) => {
    console.log("editTask>>", task);
    editFormVisible ? console.log("true") : setEditVisible(!editFormVisible);
    setTaskEditingId(index);
    setTaskEditing(task);
  };

  const updateTask = (index, newTask) => {
    console.log("index>>>", index);
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1, newTask);
    console.log("newTaskList>>>", newTaskList);
    setTaskList(newTaskList);
    setEditVisible(!editFormVisible);
  };

  const onDragStartOutside = (index) => setdragStartIndex(index);

  const onDropOutside = (dropIndex) => {
    const dragItem = taskList[dragStartIndex];

    // delete draged item in list
    let list = [...taskList];
    list.splice(dragStartIndex, 1);
    if (dragStartIndex < dropIndex) {
      setTaskList([
        ...list.slice(0, dropIndex - 1),
        dragItem,
        ...list.slice(dropIndex - 1, list.length),
      ]);
    } else {
      setTaskList([
        ...list.slice(0, dropIndex),
        dragItem,
        ...list.slice(dropIndex, list.length),
      ]);
    }
  };

  return (
    <div className="wrap_todolist">
      <div className="title">Note Your Task</div>
      <div className="todo_toolbar">
        <div className="todo_form">
          <Form addTask={addTask} />
        </div>
        <div className="todo_editForm">
          <EditForm
            index={taskEditingId}
            task={taskEditing}
            setTaskEditing={setTaskEditing}
            visible={editFormVisible}
            updateTask={updateTask}
          />
        </div>
      </div>
      <div className="todo_taskList">
        <div
          className="todo_task"
          onClick={() => {
            console.log(taskList);
          }}
        >
          {taskList.map((item, index) => (
            <Task
              key={index}
              index={index}
              task={item}
              removeTask={removeTask}
              editTask={editTask}
              updateTask={updateTask}
              onDragStartOutside={(index) => onDragStartOutside(index)}
              onDropOutside={(index) => onDropOutside(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
