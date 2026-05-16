import React from "react";
import Create from "./Create";
import { useEffect } from "react";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrash2Fill,
} from "react-icons/bs";
import { API_BASE_URL } from "./config";

const Home = () => {
  const [todos, setTodos] = React.useState([]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/get`)
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`${API_BASE_URL}/update/${id}`)
      .then(() => {
        setTodos((prev) =>
          prev.map((t) => (t._id === id ? { ...t, done: true } : t)),
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/delete/${id}`)
      .then(() => {
        setTodos((prev) => prev.filter((t) => t._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <Create onAdd={(item) => setTodos((prev) => [item, ...prev])} />
      <br />
      {todos.length === 0 ? (
        <div>
          <h2>No Records </h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon">
                  {" "}
                </BsFillCheckCircleFill>
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              {/* Add more todo details here */}
            </div>
            <div>
              <span>
                {" "}
                <BsFillTrash2Fill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />{" "}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
