import {React} from 'react';
import { BlogNav } from './components/blogNav';

import './App.css';

import { BlogPage } from './pages/blog-page';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { BlogFormPage } from './pages/blog-form-page';
import Alert from "react-bootstrap/Alert";
import { BlogOnline } from './components/blogOnline';

import Container from 'react-bootstrap/Container';



function App() {
  return (
    
    <Container className="mw-100">
    <BrowserRouter>
      <BlogNav/>

      { (!BlogOnline()) && <Alert variant="danger">No se tiene conexion a internet!</Alert>}

          <Routes>
            <Route path="/" element={ <BlogPage/>} />
            <Route path="/create" element={ <BlogFormPage/>} />
            <Route path="/update/:id" element={ <BlogFormPage/>} />
          </Routes>
        </BrowserRouter>
  </Container>

  

  );
}

export default App;
