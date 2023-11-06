import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import { BlogOnline } from './blogOnline';

export function BlogItem({blog}) {

    
    const navigate = useNavigate();

    return (
      <Card border="primary"  style={{ marginBottom: '10px' }}>        
      <Card.Header>{blog.titulo}</Card.Header>       
        <Card.Body>  
            
          <Card.Text>            
            {blog.contenido.slice(0, 69)}
          </Card.Text>
          
          <Button variant="primary" onClick={() => navigate('/update/'+ blog.id)}>Editar</Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted"> Autor: {blog.autor} </small>
        </Card.Footer>
        
      </Card>
    );
  }


