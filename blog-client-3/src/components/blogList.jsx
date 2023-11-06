import { useState, useEffect } from "react";
import { getAllBlogs } from "../api/blogs.api";
import { BlogItem } from "./blogItem";

import {useForm} from "react-hook-form"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BlogOnline } from "./blogOnline";

export function BlogList() {

    const [blogs, setBlog] = useState([])
    const {register, handleSubmit} = useForm()

    const [blogsFiltered, setBlogFiltered] = useState([])

    let filtroTitulo = '';
    let filtroAutor = '';
    let filtroContenido = '';

    const procesaSubmit = handleSubmit( async data => {        
        console.log(data);

        filtroTitulo = data.filtroTitulo.toUpperCase();
        filtroAutor = data.filtroAutor.toUpperCase();
        filtroContenido = data.filtroContenido.toUpperCase();

        if ( (filtroTitulo !== "") || (filtroAutor !== "") || (filtroContenido !== "")  ) {
            setBlogFiltered(blogs.filter(b0 => b0.titulo.toUpperCase().includes(filtroTitulo) && b0.autor.toUpperCase().includes(filtroAutor) && b0.contenido.toUpperCase().includes(filtroContenido)  ));
        } else {
            setBlogFiltered(blogs);
        }
        
    })

    useEffect(() => {

        async function loadBlogs() {
            const misBlogs = await getAllBlogs();
            setBlog(misBlogs.data.data);            
            setBlogFiltered(misBlogs.data.data);            
        }

        loadBlogs();
    }, [])

    return (
        <div style={{marginTop:'20px'}}> 
            <h5> Filtros de busqueda: </h5>
            <Form onSubmit={procesaSubmit} style={{ marginBottom: '10px' }} >
                <Form.Group as={Row} className="mb-3" controlId="titulo">
                    <Form.Label column sm="2"> Titulo </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Titulo..." {...register("filtroTitulo")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="autor">
                    <Form.Label column sm="2"> Autor </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Autor..." {...register("filtroAutor")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="contenido">
                    <Form.Label column sm="2"> Contenido </Form.Label>
                    <Col sm="10">
                        <Form.Control type="textarea" placeholder="Contenido..." {...register("filtroContenido")} />
                    </Col>
                </Form.Group>
                <Button variant="info" type="submit">Filtrar</Button>                
            </Form>
            <hr/>
            { blogsFiltered.map( b1 => (
                        <BlogItem key={b1.id} blog={b1}></BlogItem>
                    ) )                
            }

        </div>
    )
}