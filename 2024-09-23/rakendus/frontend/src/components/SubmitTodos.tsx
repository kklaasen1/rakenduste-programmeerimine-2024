import { Box, Button, Stack, TextField } from "@mui/material";
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
      } else {
        console.warn("No success");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="Priority" type="number" value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
          <TextField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
          <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <Button type="submit">{onUpdate ? "Update" : "Add"}</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitTodo;