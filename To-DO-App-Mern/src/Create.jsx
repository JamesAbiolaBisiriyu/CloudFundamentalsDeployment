import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
const Create = ({ onAdd }) => {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    axios
      .post(`${API_BASE_URL}/add`, { task: task })
      .then((result) => {
        setTask("");
        if (onAdd) onAdd(result.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Create;
