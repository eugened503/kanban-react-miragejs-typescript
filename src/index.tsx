import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Server, Model } from "miragejs";

new Server({
  models: {
    todo: Model,
    prog: Model,
    done: Model,
  },

  routes() {
    this.namespace = "api";
    this.timing = 750;

    this.get("/todos", (schema: any) => {
      return schema.todos.all(); // persistent even after navigating away
    });

    this.post("/todos", (schema: any, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.todos.create(attrs);
    });

    this.delete("/todos/:id", (schema: any, request) => {
      const deleteTodo = JSON.parse(request.requestBody);
      return schema.todos.find(deleteTodo.id).destroy();
    });

    this.post("/progress", (schema: any, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.progs.create(attrs);
    });

    this.delete("/progress/:id", (schema: any, request) => {
      const deleteTodoProgress = JSON.parse(request.requestBody);
      return schema.progs.find(deleteTodoProgress.id).destroy();
    });

    this.post("/done", (schema: any, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.dones.create(attrs);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
