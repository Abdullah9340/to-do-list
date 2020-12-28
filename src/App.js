import './App.css';
import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = "todoApp.js";
function App() {

  const [todos,setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos){
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);


  function addTodo(e){
    const name = todoNameRef.current.value;
    if(name === ""){
      return;
    }
    setTodos(prevTodos => {
      return [...prevTodos, {id: prevTodos.length + 1, name: name, completed: false}]
    });
    todoNameRef.current.value = null;
  }

  function clearTodo(e){
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  function toggleTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  return (
    <>
      <header className="main-header">To-Do List</header>
      <div className="addTodo">
        <input ref = {todoNameRef} className = "input-todo" type="text" />
        <div className = "buttons">
          <button className ="todo-button" onClick = {addTodo}>Add To-Do</button>
          <button className="todo-button" onClick = {clearTodo}>Remove Completed To-Do</button>
        </div>
      </div>
      <div className="todo-list">
        <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
      </div>
    </>
  );
}

export default App;
