import React from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {toast } from 'react-toastify';
import Spin from '../../images/spin.gif'
import './Register.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const Navigate = useNavigate()
    const [Register, setRegister] = useState({
        name:'',
        username:'',
        password:''
    })
    const [Loading, setLoading] = useState(false)

    const RegisterHandle=(e)=>{
        e.preventDefault();
        if(Register?.name =="" || Register?.username =="" || Register?.password == ""){

            toast.error('Fill the fields',{
                position: toast.POSITION.TOP_CENTER
            })
            toast.clearWaitingQueue();
            return;
        }
        setLoading(true)
       
        axios.post('https://social-media-be.onrender.com/api/auth/register', Register)
          .then(function (response) {
            console.log(response);
            setLoading(false)

            localStorage.setItem("access_token",response.data.token)
            Navigate('/')
          })
          .catch(function (error) {
            setLoading(false)

            console.log(error);
            if(error?.response?.data?.error){
                toast.error(error?.response?.data?.message,{
                    position: toast.POSITION.TOP_CENTER
                })
                toast.clearWaitingQueue();
            }
           
          });

    }
  return (
    <div className='d-flex align-item-center justify-content-center register_container' >
      {Loading && <div className="loading_screen">
        <img src={Spin} alt="" />
      </div>}
    <Form className='justify-content-center d-flex flex-column container-sm register_form_container'>
    <p class="h2 text-primary text-center">Register</p>
      <Form.Group className="mb-3" controlId="formBasicname">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" className='py-2  border-0 rounded-0 border-bottom border-primary' onChange={(e)=>{
            setRegister(prev=>({...prev,name:e.target.value}))
        }} name="name" required/>
      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicusername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" onChange={(e)=>{
            setRegister(prev=>({...prev,username:e.target.value}))
        }} name="username" className='py-2 border-bottom rounded-0 border-0 border-primary' required/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{
            setRegister(prev=>({...prev,password:e.target.value}))
        }} name="password" className='py-2 border-bottom rounded-0 border-0 border-primary' required   />
      </Form.Group>
 
      <Button variant="primary" type='submit' onClick={RegisterHandle}>
        Submit
      </Button>


      <p className='text-center my-3'>Already have account? <a href={`login`}>Login</a></p>
    </Form>
  </div>
  )
}

export default Register