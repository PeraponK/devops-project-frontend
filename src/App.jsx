import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');



  const handleSubmit = async () => {
    console.log('API URL is', import.meta.env.VITE_API_URL);
    console.log("clicked")
    setError('');
    setResponse('');
    console.log(`${import.meta.env.VITE_API_URL}/drop`)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/drop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setError('Failed to send data');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Drop Page
      </Typography>
      <TextField
        fullWidth
        label="Enter something"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      {response && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {response}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default App;
