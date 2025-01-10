import React from "react";
import './App.css';

// components
import InputTodo1 from "./components/InputTodo1";
import ListTodos from "./components/ListTodos";


function App() {
  return (
    <>
      <div className="container">
        <form>
        <table class="table table-hover text-center">
          <thead>
            <tr>
              <th><h1><bold>List of Todos</bold></h1></th>
              <th><InputTodo1 /></th>
            </tr>
          </thead>
        </table>
        </form>
        <ListTodos />
      </div>
    </>
  );
}

export default App;
