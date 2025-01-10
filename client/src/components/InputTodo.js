import React, { useState } from "react";

function InputTodo() {
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
            <h1 className="text-center mt-5">Input Todo</h1>
            
            <div className="mt-5">
                <form className="d-flex" onSubmit={onSubmitForm}>
                    <input type="text" className="form-control" placeholder="Enter todo item"
                    value={description} onChange={e => setDescription(e.target.value)} />
                    <button className="btn btn-success ml-1">Add</button>
                </form>
            </div>
           
        </>
    );
};

export default InputTodo;