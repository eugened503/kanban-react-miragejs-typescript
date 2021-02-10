import React from "react";
import { ITodo } from "../interfaces/interfaces";

type TodoListProps = {
  todos: ITodo[];
  addProgress(id: number, title: string): void;
};

const TodoItem: React.FC<TodoListProps> = ({ todos, addProgress }) => {
  const progressHandler = (
    event: React.MouseEvent,
    id: number,
    title: string
  ) => {
    event.preventDefault();
    addProgress(id, title);
  };

  return (
    <>
      {todos.map((todo) => {
        return (
          <div
            className="d-flex flex-row bg-white mb-3 rounded border border-2 flex-item"
            key={todo.id}
          >
            <div className="rectangle">
              <div className="rectangle-line"></div>
              <div className="rectangle-line-two"></div>
            </div>
            <h3 className="p-2 bd-highlight">{todo.title}</h3>
            <div className="p-2 bd-highlight ml">
              <label
                className="btn btn-outline-primary"
                htmlFor="btnradio1"
                onClick={(event) => progressHandler(event, todo.id, todo.title)}
              >
                Start
              </label>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TodoItem;
