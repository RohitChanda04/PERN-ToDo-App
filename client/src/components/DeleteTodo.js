import React, { useState } from 'react'

const DeleteTodo = ({ todo }) => {
    const [todos, setTodos] = useState([]);
    // eslint-disable-next-line
    const [description, setDescription] = useState(todo.description);

    const deleteTodo = async (todo_id) => {
        try {
            // eslint-disable-next-line
            const response = await fetch(`http://localhost:3000/todos/delete-todo/${todo_id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== todo_id));
            window.location = "/";
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <button type="button"class="btn btn-warning" data-toggle="modal"
            data-target={`#delete-id${todo.todo_id}`}
            onClick={() => setDescription(todo.description)}>
            Delete
            </button>

            <div class="modal" id={`delete-id${todo.todo_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Delete Todo</h4>
                            <button type="button" class="close" data-dismiss="modal" 
                            onClick={() => setDescription(todo.description)}>&times;</button>
                        </div>

                        <div class="modal-body">
                            <h5><b>{todo.description}</b></h5>
                            <hr></hr>
                            <h6>Are you sure you want to delete it?</h6>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-dismiss="modal" 
                            onClick={e => deleteTodo(todo.todo_id)}>Delete</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" 
                            onClick={() => setDescription(todo.description)}>Dismiss</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteTodo;