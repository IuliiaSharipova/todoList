import React from 'react';
import './App.css';
import BasicAppBar from '../components/BasicAppBar';
import {Container} from '@mui/material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';

function App() {
    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}
export default App;

