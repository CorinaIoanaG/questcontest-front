import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

axios.get('https://localhost:8080/quest');

function App() {
  return (
    <Box className='App' sx={{ backgroundColor: 'lightgray', height: 2, display: "flex", flexDirection: "column"}}>
    <Typography sx ={{height: 50}} fontSize={"large"}> QUEST CONTEST </Typography>
    </Box>
  );
}

export default App;
