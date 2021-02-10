import React from "react";
import { ITodoPropgress } from "../interfaces/interfacesPropgress";
import { TimerId } from "../interfaces/interfacesTimerId";
import {
  ELEMENT_HOUR,
  ELEMENT_MIN,
  ELEMENT_SECOND,
} from "../constants/constants";

type TodoListProps = {
  progress: ITodoPropgress[];
  timerArray: TimerId[];
  addDone(id: number, title: string): void;
};

const ProgressItem: React.FC<TodoListProps> = ({
  progress,
  timerArray,
  addDone,
}) => {
  const stop = (event: React.MouseEvent, id: string | any, title: string) => {
    event.preventDefault();
    for (let i = 0; i < timerArray.length; i++) {
      for (let j = 0; j < Object.values(timerArray[i]).length; j++) {
        if (Object.values(timerArray[i])[0] === id) {
          clearInterval(Object.values(timerArray[i])[1]);
        }
      }
    }
    addDone(id, title);
  };
  return (
    <>
      {progress.map((item) => {
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

              <div className="d-flex flex-row justify-content-between">
                <input
                  className="input-novisible"
                  type="text"
                  defaultValue="0"
                  id={`${item.id}`}
                />

                <div className="d-flex flex-row justify-content-between progress-paragraph">
                  <p id={`${(item.id + ELEMENT_HOUR).toString()}`}>00</p>
                  <span>:</span>
                  <p id={`${(item.id + ELEMENT_MIN).toString()}`}>00</p>
                  <span>:</span>
                  <p id={`${(item.id + ELEMENT_SECOND).toString()}`}>00</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline-info btn-progress d-flex flex-row justify-content-between"
              onClick={(event) => stop(event, item.id.toString(), item.title)}
            >
              Resolve
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ProgressItem;
