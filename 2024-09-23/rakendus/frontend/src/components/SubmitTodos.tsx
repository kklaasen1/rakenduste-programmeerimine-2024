import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

type SubmitTodoProps = {
  fetchTodos: () => void;
  initialData?: { title: string; priority: number; status: string; category: string };
  onUpdate?: (id: string, updatedTodo: Partial<{ title: string; priority: number; status: string; category: string }>) => Promise<void>;
  id?: string;
};

const SubmitTodo = ({ fetchTodos, initialData, onUpdate, id }: SubmitTodoProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPriority(initialData.priority);
      setStatus(initialData.status);
      setCategory(initialData.category);
    }
  }, [initialData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTodo: Partial<{ title: string; priority?: number; status: string; category: string }> = {
        title,
        ...(priority !== undefined && { priority }),
        status,
        category,
    };

    if (onUpdate && id) {
      await onUpdate(id, updatedTodo);
    } else {
      await submitTodo();
    }
    fetchTodos();
  };

  const submitTodo = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, priority, status, category }),
      });

      if (response.ok) {
        console.log("Success", response);
        setErrors({});
      } else {
        const data = await response.json();
        if (data.errors) {
          const validationErrors: { [key: string]: string } = {};
          data.errors.forEach((err: { param: string; msg: string }) => {
            validationErrors[err.param] = err.msg;
          });
          setErrors(validationErrors);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField 
            label="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField 
            label="Priority" 
            type="number" 
            value={priority} 
            onChange={(e) => setPriority(Number(e.target.value))}
            error={!!errors.priority}
            helperText={errors.priority}
            />
          <TextField 
            label="Status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            error={!!errors.status}
            helperText={errors.status}
            />
          <TextField 
            label="Category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
            />
          <Button type="submit">{onUpdate ? "Update" : "Add"}</Button>
        </Stack>
        {/* Display general error messages */}
        {Object.keys(errors).length > 0 && (
          <Typography color="error" sx={{ mt: 2 }}>
            Please correct the above errors.
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default SubmitTodo;