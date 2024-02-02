import { Button } from 'react-bootstrap';
import {useState} from 'react';
import { Form , Image} from "react-bootstrap";
import './Login.css'
const Card = ({animals, handleDelete,flag}) => {
    const [flag3,setflag3]=useState(false);

    return (  
        <div className="container">
        {animals.map((animal) => (
            <div className="card" key={animal.id}>
            <Image
                src={animal.ImageLink}
                alt={animal.latin_name}
                className="card-img-top cardimage"
            />
            <div className="card-body">
                <h3 className="card-title">{animal.name}</h3>
                <p>{animal.Para}</p>
                {flag && (<Button className="btn-danger m-1" onClick={() => handleDelete(animal.name)}>Delete Post</Button>)}
                <Button className="m-1">Add Comment</Button>
                {/* <form onSubmit={adddata1}>
                <label>Comment :
                    <input
                    type="text" 
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    />
                </label>
                <button className='m-1' type='submit'> Submit </button>
            </form> */}
            </div>
        </div>
            ))}
    </div>
    );
}
 
export default Card;