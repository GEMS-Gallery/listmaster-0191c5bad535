import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Box } from '@mui/material';
import { Add, Delete, Check } from '@mui/icons-material';

interface ShoppingItem {
  id: bigint;
  text: string;
  completed: [] | [bigint];
}

const App: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const result = await backend.getItems();
      setItems(result);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    setLoading(false);
  };

  const addItem = async () => {
    if (newItem.trim() === '') return;
    setLoading(true);
    try {
      await backend.addItem(newItem);
      setNewItem('');
      await fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
    setLoading(false);
  };

  const toggleComplete = async (id: bigint) => {
    setLoading(true);
    try {
      await backend.markCompleted(id);
      await fetchItems();
    } catch (error) {
      console.error('Error marking item as completed:', error);
    }
    setLoading(false);
  };

  const deleteItem = async (id: bigint) => {
    setLoading(true);
    try {
      await backend.deleteItem(id);
      await fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping List
      </Typography>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addItem}
          disabled={loading}
          startIcon={<Add />}
          sx={{ ml: 1 }}
        >
          Add
        </Button>
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <List>
        {items.map((item) => (
          <ListItem
            key={Number(item.id)}
            dense
            button
            onClick={() => toggleComplete(item.id)}
            sx={{
              textDecoration: item.completed.length > 0 ? 'line-through' : 'none',
              opacity: item.completed.length > 0 ? 0.5 : 1,
            }}
          >
            <ListItemText primary={item.text} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteItem(item.id)}
                disabled={loading}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
