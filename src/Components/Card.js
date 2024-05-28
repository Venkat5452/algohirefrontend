import { Button } from 'react-bootstrap';
import {useState} from 'react';
import {Image} from "react-bootstrap";
import './Login.css'
import axios from 'axios';
import { BASE_URL } from './helper';
const Card = ({animals, handleDelete,email,pname,flag,setflag}) => {
    const [cflag,setcflag]=useState(false);
    const [comment,setcomment]=useState("");
    const [data,setdata]=useState({
        name:"",
        comment:"",
        pname:pname,
        email:""
    })
    const addComment=async(name)=>{
        data.name=name;
        setcflag(true);
    }
    const adddataComment=(e)=>{
        e.preventDefault();
        data.pname=pname;
        data.comment=comment;
        console.log(data);
        setflag(false);
        axios.post(BASE_URL + "/addcomment",data).then(()=>{
            window.location.reload();
        })
    }
    const like=(name)=>{
        data.name=name;
        data.email=email;
        setflag(false);
        axios.post(BASE_URL+"/likeposts",data).then((res)=>{
            window.location.reload();
        })
    }
    const unlike=(name)=>{
        data.name=name;
        data.email=email;
        setflag(false);
        axios.post(BASE_URL+"/unlikeposts",data).then((res)=>{
            window.location.reload();
        })
    }
    return (  
        <div className="container " style={{maxWidth:"800px"}}>
        {animals.map((animal) => (
            <div className="card" key={animal.id} style={animal.Likes.includes(email)===false ? {backgroundColor:"while"} : {backgroundColor:"#ffe6f3"}}>
            <Image
                src={animal.ImageLink}
                alt={animal.latin_name}
                className="card-img-top cardimage"
                maxWidth="100px"
            />
            <div className="card-body">
                <h3 className="card-title">{animal.name}</h3>
                <p>{animal.Para}</p>
                {!animal.Likes.includes(email) && <Button className='rounded-5 border border-dark 'style={{backgroundColor:"white",color:"black"}} onClick={()=>{like(animal.name)}} >Like</Button>}
                {animal.Likes.includes(email) && <Button className='rounded-5 border border-white' style={{backgroundColor:"#ff1a94"}} onClick={()=>{unlike(animal.name)}}>Liked</Button>}
                {email===animal.email && (<Button className="btn-danger m-1" onClick={() => handleDelete(animal.name)}>Delete Post</Button>)}
                {(!cflag || data.name!==animal.name) && <Button className="m-1" onClick={() => addComment(animal.name)}>Add Comment</Button>}
                {(cflag && data.name===animal.name) && <Button className="m-1 btn-danger" onClick={() => setcflag(false)}>Close Comments</Button>}
                {(cflag && data.name===animal.name) && (animal.comments.length!==0 && (animal.comments.map((k)=>(
                            <p style={{color:"blue"}}>{k.name} {"->"} {k.comment}</p>
                ))))}
                {(cflag && data.name===animal.name) && (<form onSubmit={adddataComment}>
                <label>Comment :
                    <input
                    type="text" 
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    />
                </label>
                <button className="m-1 bg-success" type='submit'> Post </button>
            </form>)}
            </div>
        </div>
            ))}
    </div>
    );
}
 
export default Card;