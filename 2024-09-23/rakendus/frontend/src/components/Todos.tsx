import { Box, List, ListItem, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodos";

type Todo = {
  id: string;
  title: string;
  priority: number;
  status: string;
  category: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setTodos(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8080/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = async (id: string, updatedTodo: Partial<Todo>) => {
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    setEditingTodo(null);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box>
      <Typography variant="h3">To-Do List</Typography>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h6">{todo.title}</Typography>
              <Typography variant="body1">Priority: {todo.priority}</Typography>
              <Typography variant="body1">Status: {todo.status}</Typography>
              <Typography variant="body1">Category: {todo.category}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <Button onClick={() => handleEdit(todo)}>Edit</Button>
                <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
              </Box>
            </Box>
            {editingTodo && editingTodo.id === todo.id && (
              <SubmitTodo 
                fetchTodos={fetchTodos} 
                initialData={editingTodo} 
                onUpdate={handleUpdate} 
                id={editingTodo.id} 
              />
            )}
          </ListItem>
        ))}
      </List>
      <SubmitTodo fetchTodos={fetchTodos} />
    </Box>
  );
};

export default Todos;