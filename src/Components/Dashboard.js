import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,Image } from 'react-bootstrap';
import {useState} from 'react';
import axios from "axios";
import { BASE_URL } from "./helper";
import { Form} from "react-bootstrap";
import Card from './Card';
function Dashboard() {
    const navigate=useNavigate();
    const [flag,setflag]=useState(false);
    const [email,setemail]=useState("");
    const [name,setname]=useState("");
    const [data,setdata]=useState([]);
    const [flag3,setflag3]=useState(true);
    const [tdata,settdata]=useState({
        email:"",
        name:"",
        Para:"",
        ImageLink:""
});
    const handleDelete = async(name) => {
      tdata.email=email;
      tdata.name=name;
      setflag(false);
       axios.post(BASE_URL + "/delete" ,tdata).then((res)=>{
        window.location.reload();
       })
    }
    const adddata=async(e)=>{
        e.preventDefault()
        setflag3(false);
    }
    const adddata1=async(e)=>{
      e.preventDefault();
        tdata.email=email;
        setflag3(false);
        setflag(false);
        axios.post(BASE_URL + "/Allblogs",tdata).then((res)=>{
          window.location.reload();
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
            setemail(localStorage.getItem('token1'));
            setname(localStorage.getItem('token'));
                if(data.length===0) {axios.get(BASE_URL + "/getdata").then((res)=>{
                    console.log(res.data.data);
                    setdata(res.data.data);
                    setflag(true);
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
    <div className='container align-items-center justify-content-center'>
        <h3>Hello {name}</h3>
        <Image className='rounded-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiOD8KprvrSYBZlDAATNG-rVDLWG6BaVehQ&usqp=CAU"></Image>
        {!flag && <div className='text-success'>Loading posts please wait...</div>}
        {flag && <div className='box border border-dark p-1 rounded-4' >
           <div><Button className='m-3' onClick={adddata}>Add Post</Button><Button className='m-3' draggable = "true" variant='primary' onClick={handlelogout}>Log out</Button></div>
           {flag3 && (<Card animals={data} handleDelete={handleDelete} email={email} pname={name} flag={flag} setflag={setflag}/>)}
           {!flag3 && (<div className='m-5'>
            <Form onSubmit={adddata1} >
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
        </div>}
    </div>
    </>
  )
}

export default Dashboard;