const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware 

app.use(cors())
app.use(express.json());

// Routes //


//Create a todo
app.post("/todos", async (req, res) => {
    try {
        
        const { description } = req.body;
        const newTodo = await pool.query("Insert into todo (description) values($1) returning *", [description]);

        res.json(newTodo)
    } catch (error) {
        console.log(error.message);
    }
})


//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("Select * from todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//get a todo


app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("Select * from todo where todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})


//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("Update todo Set description = $1 where todo_id = $2", [description, id]);

        res.json("Todo was updated");

    } catch (error) {
        console.log(error.message);
    }
})


//delete todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("Delete from todo where todo_id = $1", [id]);

        res.json("Todo was deleted")
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(5000, () => {
    console.log("server has started on port 5000");
});