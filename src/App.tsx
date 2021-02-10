import React, { useRef, useState } from "react";
import TodoItem from "./components/TodoItem";
import ProgressItem from "./components/ProgressItem";
import { ITodo } from "./interfaces/interfaces";
import { ITodoPropgress } from "./interfaces/interfacesPropgress";
import { ITodoDone } from "./interfaces/interfacesITodoDone";
import calculateTimer from "./utils/calculateTimer";
import { TimerId } from "./interfaces/interfacesTimerId";
import DoneItem from "./components/DoneItem";
import * as api from "./Api/Api";
import {
  ELEMENT_HOUR,
  ELEMENT_MIN,
  ELEMENT_SECOND,
} from "./constants/constants";

const App: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [classes, setClasses] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [progress, setProgress] = useState<ITodoPropgress[]>([]);
  const [timerArray, setTimerArray] = useState<TimerId[]>([]);
  const [doneTodos, setDoneTodos] = useState<ITodoDone[]>([]);
  const [isSpinner, setIsSpinner] = useState<string>("");

  const renderLoading = (isLoading: boolean) => {
    if (isLoading) {
      setIsSpinner("spinner-border");
    } else {
      setIsSpinner("");
    }
  };

  const addHandler = (obj: any) => {
    const newTodo: ITodo = {
      title: obj.todo.text,
      id: Number(obj.todo.id),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const timer = (id: string) => {
    let elem: HTMLElement | any = document.getElementById(id);
    elem.value = parseInt(elem.value) + 1;
    let timeArray: Array<any> = calculateTimer(Number(elem.value));
    let logElemHour: HTMLElement | any = document.getElementById(
      id + ELEMENT_HOUR
    );
    let logElemMin: HTMLElement | any = document.getElementById(
      id + ELEMENT_MIN
    );
    let logElemSecond: HTMLElement | any = document.getElementById(
      id + ELEMENT_SECOND
    );
    logElemHour.innerHTML = timeArray[0];
    logElemMin.innerHTML = timeArray[1];
    logElemSecond.innerHTML = timeArray[2];
  };

  const addTimerId = (id: string, timerId: any) => {
    const newId: TimerId = {
      id: id,
      timerId: timerId,
    };
    setTimerArray((prev) => [newId, ...prev]);
  };

  const progressHandler = (id: number, title: string) => {
    renderLoading(true);
    api
      .deleteCard(id)
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        const newTodoProgress: ITodoPropgress = {
          title: title,
          id: id,
        };

        api
          .sendProgress(newTodoProgress)
          .then((newProgressTodo) => {
            setProgress((prev) => [newProgressTodo.prog, ...prev]);
            let timerId: any = setInterval(() => timer(id.toString()), 1000);
            addTimerId(id.toString(), timerId);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            renderLoading(false);
          });
      })
      .catch((err) => console.log(err));
  };

  const addDone = (id: number, title: string) => {
    renderLoading(true);
    api
      .deleteProgress(id)
      .then(() => {
        let elem: HTMLElement | any = document.getElementById(id.toString());
        let myPrice = Number(elem.value);
        setProgress((prev) =>
          prev.filter((progress) => Number(progress.id) !== Number(id))
        );

        const newTodoDone: ITodoDone = {
          title: title,
          id: id,
          price: +(myPrice * 0.27).toFixed(2),
        };
        api
          .sendDone(newTodoDone)
          .then((newTodoDone) => {
            setDoneTodos((prev) => [newTodoDone.done, ...prev]);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            renderLoading(false);
          });
      })
      .catch((err) => console.log(err));
  };

  const addTodo = (event: React.MouseEvent) => {
    event.preventDefault();
    const classInput = classes === "input-visible" ? "" : "input-visible";
    setClasses(classInput);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      renderLoading(true);
      api
        .sendCard(ref.current!.value)
        .then((newTodo) => {
          addHandler(newTodo);
          ref.current!.value = "";
          setClasses("");
        })
        .catch((err) => console.log(err))
        .finally(() => {
          renderLoading(false);
        });
    }
  };

  return (
    <div className="app">
      <div className="container container-padding">
        <h4 className="fs-6 container-font">Anyway Labs Test Project</h4>
        <p className="container-paragraph"> Just some good deeds</p>
        <div className="row gap-3 row-margin">
          <div className="col-sm bg-light rounded border border-2 pt">
            <div className="flex-item-height d-flex flex-row bd-highlight mb-2 justify-content-start">
              <div className="d1">{todos.length}</div>
              <p className=" fw-bold">To do</p>
            </div>
            <TodoItem todos={todos} addProgress={progressHandler} />
            <div>
              <input
                className={`form-control input-def ${classes}`}
                ref={ref}
                type="text"
                id="title"
                placeholder="Введите название дела и нажмите Enter"
                onKeyPress={keyPressHandler}
              />
            </div>
            <button
              type="button"
              className="btn-plus btn-lg d-flex flex-row justify-content-between"
              onClick={(event) => addTodo(event)}
            >
              <svg
                className="btn-svg"
                id="i-plus"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="15"
                height="15"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="9"
              >
                <path d="M16 2 L16 30 M2 16 L30 16" />
              </svg>
              <p className="button-paragraph">New task</p>
            </button>
          </div>
          <div className="col-sm bg-light rounded border border-2 pt">
            <div className="flex-item-height d-flex flex-row bd-highlight mb-2 justify-content-start">
              <div className="d1">{progress.length}</div>
              <p className=" fw-bold">In progress</p>
            </div>
            <ProgressItem
              progress={progress}
              timerArray={timerArray}
              addDone={addDone}
            />
          </div>
          <div className="col-sm bg-light rounded border border-2 pt">
            <div className="flex-item-height d-flex flex-row bd-highlight mb-2 justify-content-start">
              <div className="d1">{doneTodos.length}</div>
              <p className=" fw-bold">Done</p>
            </div>
            <DoneItem doneTodos={doneTodos} />
          </div>
        </div>
      </div>

      <div className="text-center spinner-center">
        <div className={`${isSpinner}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default App;
