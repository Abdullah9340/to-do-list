import React from 'react'
import "./App.css";

export default function Todo({todo,toggleTodo}) {

    function handleToggle(){
        toggleTodo(todo.id);
    }
    return (
        <div className = "todo-label">
            <label>
                <input type="checkbox" checked = {todo.completed} onChange = {handleToggle} id = "checkbox"/>
                {todo.name}
            </label>
        </div>
    )
}
