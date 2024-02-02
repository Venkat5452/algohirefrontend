import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup ,Image } from 'react-bootstrap';
import {useState} from 'react';
import axios from "axios";
import { BASE_URL } from "./helper";
import { Form} from "react-bootstrap";
import Card from './Card';
function Dashboard() {
    const navigate=useNavigate();
    const [flag,setflag]=useState(false);
    const [name,setname]=useState("");
    const [data,setdata]=useState([]);
    const [flag3,setflag3]=useState(true);
    const [comment,setcomment]=useState("");
    const [tdata,settdata]=useState({
        name:"",
        Para:"",
        ImageLink:""
});
    const handleDelete = async(name) => {
       axios.delete(BASE_URL + "/delete/" + name).then((res)=>{
        window.location.reload();
       })
    }
    const adddata=async(e)=>{
        e.preventDefault()
        setflag3(false);
    }
    const adddata1=async(e)=>{
        setflag3(false);
        axios.post(BASE_URL + "/enterdata",tdata).then((res)=>{
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
          const {name,value}=e.target
          settdata ({
              ...tdata,
              [name]:value
          })
        };
    useEffect(()=>{
        function f() {
          if(!localStorage.getItem('token')) {
            navigate("/login");  
          }
          else {
            if(localStorage.getItem('token1')==="venkatsai.bandi2019@gmail.com") {
                setflag(true);
            }
            setname(localStorage.getItem('token'));
                if(data.length===0) {axios.get(BASE_URL + "/getdata/venkatsai.bandi2019@gmail.com").then((res)=>{
                    console.log(res.data.data);
                    setdata(res.data.data);
                })}
          }
        }
          f();
      },);
      const handlelogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('token1');
        navigate('/');
      }
  return (
    <>
    <div className='container align-items-center justify-content-center mt-2'>
        <h3>Hello {name}</h3>
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiOD8KprvrSYBZlDAATNG-rVDLWG6BaVehQ&usqp=CAU"></Image>
        <div className='box border border-dark p-1'>
           <div>{flag && (<Button className='m-3' onClick={adddata}>Add Post</Button>)}
           <Button className='m-3' draggable = "true" variant='primary' onClick={handlelogout}>Log out</Button></div>
           {flag3 && (<Card animals={data} handleDelete={handleDelete} flag={flag}/>)}
           {!flag3 && (<div className='m-5'>
            <Form onSubmit={adddata1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="name"
                value={tdata.name}
                placeholder="Enter Type Or Name"
                onChange={handleSubmit}
                required
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                name="Para"
                value={tdata.Para}
                placeholder="Enter Text"
                onChange={handleSubmit}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                name="ImageLink"
                value={tdata.ImageLink}
                placeholder="Copy Paste Image Link or enter NULL"
                onChange={handleSubmit}
                required
              />
            </Form.Group>
  
            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                AddPost
              </Button>
            </div>
          </Form>
            </div>)}
        </div>
    </div>
    </>
  )
}

export default Dashboard;