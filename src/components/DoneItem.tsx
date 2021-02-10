import React from "react";
import { ITodoDone } from "../interfaces/interfacesITodoDone";

type ITodoDoneProps = {
  doneTodos: ITodoDone[];
};

const DoneItem: React.FC<ITodoDoneProps> = ({ doneTodos }) => {
  return (
    <>
      {doneTodos.map((item) => {
        return (
          <div
            className="d-flex flex-row bg-white mb-3 rounded border border-2 flex-item"
            key={item.id}
          >
            <div className="rectangle">
              <div className="rectangle-line"></div>
              <div className="rectangle-line-two"></div>
            </div>
            <div className="d-flex flex-column justify-content-start">
            <h3 className="p-2 bd-highlight">{item.title}</h3>
            <p className="todo-paragraph">${item.price}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DoneItem;
