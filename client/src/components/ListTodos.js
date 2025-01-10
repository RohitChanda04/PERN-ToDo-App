import React, { useEffect, useState } from 'react'
import EditTodo from './EditTodo';
import DeleteTodo from './DeleteTodo';

const ListTodos = () => {
    // to capture the array of todos
    const [todos, setTodos] = useState([]);

    // function to fetch the array of todos from backend and DB
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            const data = await response.json();
            setTodos(data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    // calls the getTodos() function every time the page renders
    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos);

    return (
        <>
            <div>
                {/* <h1 className='text-center mt-5'>ListTodos</h1> */}

                <div className='d-flex mt-5'>
                    <table class="table table-hover text-center">
                        <thead className='thead-light'>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo => (
                                <tr key={todo.todo_id}>
                                    <td>{todo.todo_id}</td>
                                    <td>{todo.description}</td>
                                    <td><EditTodo todo = {todo} /></td>
                                    <td><DeleteTodo todo = {todo} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default ListTodos;