import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

type SubmitCatProps = {
  fetchCats: () => void;
  initialName?: string;
  onUpdate?: (id: string, name: string) => Promise<void>;
  id?: string;
};

const SubmitCat = ({ fetchCats, initialName, onUpdate, id }: SubmitCatProps) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialName) {
        setName(initialName);
    }
  }, [initialName]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (onUpdate && id) {
        await onUpdate(id, name);
    } else {
        await submitCat();
    }
    fetchCats();
  };

  const submitCat = async () => {
    try {
      const response = await fetch("http://localhost:8080/cats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
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
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField
            label="Cat name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button type="submit">{onUpdate ? "Update" : "Add"}</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitCat;