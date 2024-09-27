import { Box, List, ListItem, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [editingCat, setEditingCat] = useState<Cat | null>(null);

  const fetchCats = async () => {
    const response = await fetch("http://localhost:8080/cats");
    const data = await response.json();

    setCats(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8080/cats/${id}`, { method: "DELETE" });
    fetchCats();
  };

  const handleEdit = (cat: Cat) => {
    setEditingCat(cat);
  };

  const handleUpdate = async (id: string, name: string) => {
    await fetch(`http://localhost:8080/cats/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    setEditingCat(null);
    fetchCats();
  };


  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <Box>
      <Typography variant="h3">Cats</Typography>
      <List>
        {cats.map((cat) => (
          <ListItem key={cat.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">{cat.name}</Typography>
              <Box>
                <Button onClick={() => handleEdit(cat)}>Edit</Button>
                <Button onClick={() => handleDelete(cat.id)}>Delete</Button>
              </Box>
            </Box>
            {editingCat && editingCat.id === cat.id && (
              <SubmitCat 
                fetchCats={fetchCats} 
                initialName={editingCat.name} 
                onUpdate={handleUpdate} 
                id={editingCat.id} 
              />
            )}
          </ListItem>
        ))}
      </List>
      <SubmitCat fetchCats={fetchCats} />
    </Box>
  );
};

export default Cats;