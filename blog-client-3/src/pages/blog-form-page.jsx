import { useForm } from "react-hook-form"
import { createBlog, deleteBlog, getBlogById, updateBlog } from "../api/blogs.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Moment from "moment"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { BlogOnline } from "../components/blogOnline";

export function BlogFormPage() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const navigate = useNavigate()
    const paramsUrl = useParams();

    const procesaSubmit = handleSubmit(async data => {
        if (paramsUrl.id) {
            await updateBlog(paramsUrl.id, data);
        } else {
            await createBlog(data);
        }
        navigate("/");
    })

    useEffect(() => {
        async function loadBlog() {
            if (paramsUrl.id) {
                const resp = await getBlogById(paramsUrl.id);
                console.log(resp);
                console.log(Moment(resp.data.data.fecha).format("yyyy-MM-DD"));
                setValue("titulo", resp.data.data.titulo);
                setValue("autor", resp.data.data.autor);
                setValue("contenido", resp.data.data.contenido);
                setValue("fecha", Moment(resp.data.data.fecha).format("yyyy-MM-DD"));
            }
        }
        loadBlog()

    }, [paramsUrl.id, setValue]);

    return (
        <div>
            <Form onSubmit={procesaSubmit} style={{ marginTop: '20px' }} >
                <Form.Group as={Row} className="mb-3" controlId="titulo">
                    <Form.Label column sm="2"> Titulo </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Titulo..." {...register("titulo", { required: true })} />
                        {errors.titulo && <Badge bg="danger">El campo es requerido</Badge>}
                    </Col>

                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="autor">
                    <Form.Label column sm="2"> Autor </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Autor..." {...register("autor", { required: true })} />
                        {errors.autor && <Badge bg="danger">El campo es requerido</Badge>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="contenido">
                    <Form.Label column sm="2"> Contenido </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows={10} placeholder="Contenido..." {...register("contenido", { required: true })} />
                        {errors.contenido && <Badge bg="danger">El campo es requerido</Badge>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="fecha">
                    <Form.Label column sm="2"> Fecha de publicación </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" placeholder="Fecha..." {...register("fecha", { required: true })} />
                        {errors.fecha && <Badge bg="danger">El campo es requerido</Badge>}
                    </Col>
                </Form.Group>
               <hr/>
                { BlogOnline() && <Button variant="primary" type="submit">Guardar</Button> } &nbsp;

                <Button variant="secondary" onClick={() => { navigate("/")}}> Cancelar </Button> &nbsp;

                {BlogOnline() &&  paramsUrl.id && <Button variant="warning" onClick={async () => {
                    const respOk = window.confirm("Eliminar la entrada");
                    if (respOk) {
                        await deleteBlog(paramsUrl.id);
                        navigate("/");
                    }
                }}> Eliminar </Button>}

            </Form>

        </div>
    )
}