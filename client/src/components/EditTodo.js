import React, { useState } from 'react'

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    const updateTodo = async (e) => {
        e.preventDefault();

        try {
            const body = {description};
            // eslint-disable-next-line
            const response = await fetch(`http://localhost:3000/todos/update-todo/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <button type="button"class="btn btn-info" data-toggle="modal"
            data-target={`#edit-id${todo.todo_id}`}
            onClick={() => setDescription(todo.description)}>
            Edit
            </button>

            <div class="modal" id={`edit-id${todo.todo_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>
                            <button type="button" class="close" data-dismiss="modal" 
                            onClick={() => setDescription(todo.description)}>&times;</button>
                        </div>

                        <div class="modal-body">
                            <input type='text' className='form-control' value={description} 
                            onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" data-dismiss="modal" 
                            onClick={e => updateTodo(e)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" 
                            onClick={() => setDescription(todo.description)}>Dismiss</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default EditTodo