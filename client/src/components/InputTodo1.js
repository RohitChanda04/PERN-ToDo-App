import React, { useState } from 'react'

const InputTodo1 = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = {description};
            
            // eslint-disable-next-line
            const response = await fetch("http://localhost:3000/todos/add-todo", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        }
        catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <button type="button"class="btn btn-success"
            data-toggle="modal"
            data-target="#newTodoModal"
            onClick={() => setDescription("")}>
            New
            </button>

            <div class="modal" id='newTodoModal'>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Add Todo</h4>
                            <button type="button" class="close" data-dismiss="modal" 
                            onClick={() => setDescription(description)}>&times;</button>
                        </div>

                        <div class="modal-body">
                            <input type="text" className="form-control" placeholder="Enter todo item"
                        value={description} onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div class="modal-footer">
                                <button className="btn btn-success ml-1" onClick={e => onSubmitForm(e)}>Add</button>
                                <button type="button" class="btn btn-danger ml-2" data-dismiss="modal" 
                                onClick={() => setDescription("")}>Dismiss</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default InputTodo1;