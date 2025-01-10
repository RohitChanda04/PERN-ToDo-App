// Storing the "express" library in a const called 'express' to use throughout the appliation
// Express library for building the server
// This below line of code helps build the payload for the post requests for req.body
const express = require("express");

// Cross-origin
// Middleware for handling cross-origin requests
const cors = require("cors");

// The const 'app' now has all the required functions provided by "express" library in order to create a server
const app = express();

// port number
const port = 3000

// Connecting to the 'pool' from the database connection in db.js
// This 'pool' const will allow us to write queries in PostgreSQL
const pool = require("./db");
const e = require("express");



// --------------------------------------------------------------------------------------------------------------------------
// Middleware - Setup for API Endpoints

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads



// --------------------------------------------------------------------------------------------------------------------------
// API endpoints

// create a todo
app.post("/todos/add-todo", async (req, res) => {
    try {
        console.log(req.body);
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    }
    catch (error) {
        console.log(error.message);
    }
});

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo");
        res.json(todos.rows);
        console.log(todos.rows);
    }
    catch (error) {
        console.log(error.message);
    }
})

// get a todo
app.get("/todos/:todo_id", async(req, res) => {
    try {
        const {todo_id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [todo_id]);
        res.json(todo.rows[0]);
        console.log(todo.rows[0]);
    }
    catch (error) {
        console.log(error.message);
    }
})

// update a todo
app.put("/todos/update-todo/:todo_id", async(req, res) => {
    try {
        const {todo_id} = req.params;
        const {description} = req.body;
        var todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, todo_id]);
        todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [todo_id]);
        res.json(todo.rows[0]);
        console.log(todo.rows[0]);
    }
    catch (error) {
        console.log(error.message);
    }
})

// delete a todo
app.delete("/todos/delete-todo/:todo_id", async(req, res) => {
    try {
        const {todo_id} = req.params;
        const deletedTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [todo_id]);
        const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [todo_id]);
        res.json(deletedTodo.rows[0]);
        console.log(deletedTodo.rows[0]);
    }
    catch (error) {
        console.log(error.message);
    }
})



// --------------------------------------------------------------------------------------------------------------------------
// start the server

// every time we want our server to start, we have to "listen" to a part number -> below line of code
// listening on port 5000
app.listen(port, () => {
    console.log("Server started on port " + port + "...");
});

// in the above line of code, as mentioned above, we are listening to the port 5000. But how do we know if we have
// successfully connected to that port?
// through a callback function that we have also passed here
// this callback function simply has a print statement to tell us that

// we can now run it using the command 'node index' which will give us the output but using 'node' has a drawback
// every time we make any change in our code, we have to re-run it using the same command
// instead we can use 'nodemon index' command to run it so that nodemon will restart the server automatically on any change
