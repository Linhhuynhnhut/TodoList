import React, { useRef } from "react";
import "./task.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Task = ({
  index,
  task,
  removeTask,
  editTask,
  onDragStartOutside,
  onDropOutside,
}) => {
  const itemRef = useRef(null);

  const onDragStart = (e) => {
    e.dataTransfer.effectedAllowed = "move";
    e.dataTransfer.setDragImage = (e.target, 500, 500);

    let ghostNode = e.target.cloneNode(true);

    ghostNode.style.position = "absolute";

    ghostNode.style.top = e.pageY - e.target.offsetHeight / 2 + "px";
    ghostNode.style.left = e.pageX - e.target.offsetWidth / 2 + "px";

    ghostNode.style.height = e.target.offsetHeight + "px";
    ghostNode.style.width = e.target.offsetWidth + "px";

    ghostNode.style.opacity = "0.8";
    ghostNode.style.pointerEvents = "none";

    // add id
    ghostNode.id = "ghostNode";

    document.body.prepend(ghostNode);

    itemRef.current.classList.add("dragstart");

    if (onDragStartOutside) {
      onDragStartOutside(index);
    }
  };

  const onDrag = (e) => {
    // move ghost node with mouse
    let ghostNode = document.querySelector("#ghostNode");
    ghostNode.style.top = e.pageY - e.target.offsetHeight / 2 + "px";
    ghostNode.style.left = e.pageX - e.target.offsetWidth / 2 + "px";
  };

  const onDragEnd = () => {
    // remove ghost node
    document.querySelector("#ghostNode").remove();
    // remove selected item style
    itemRef.current.classList.remove("dragstart");
  };

  // event when drag over item
  const onDragEnter = () => itemRef.current.classList.add("dragover");

  // event when drag leave item
  const onDragLeave = () => itemRef.current.classList.remove("dragover");

  // add event for item can drop
  const onDragOver = (e) => e.preventDefault();

  const onDrop = () => {
    itemRef.current.classList.remove("dragover");
    console.log("dropIndex>>>", index);
    onDropOutside(index);
  };

  return (
    <div
      ref={itemRef}
      className="task"
      draggable={true}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="task_content">{task}</div>
      <div className="task_options">
        <div className="task_option">
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => {
              editTask(index, task);
            }}
          />
        </div>
        <div className="task_option">
          <FontAwesomeIcon icon={faTrash} onClick={() => removeTask(index)} />
        </div>
      </div>
    </div>
  );
};

export default Task;
