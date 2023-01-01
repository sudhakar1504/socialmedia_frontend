import React from 'react';
import './Login.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';
import Spin from '../../images/spin.gif'


const Login = () => {
    const Navigate = useNavigate();
    const [Logindata, setLogindata] = useState({
        username:"",
        password:''
    })
  const [Loading, setLoading] = useState(false)

    function LoginHandle(e){
        e.preventDefault();

        if(Logindata.username =="" || Logindata?.password == ""){
            toast.error('Fill the fields',{
                position: toast.POSITION.TOP_CENTER
            })
            toast.clearWaitingQueue();
            return;
        }
        setLoading(true)
        axios.post('https://social-media-be.onrender.com/api/auth/login', Logindata)
          .then(function (response) {
            console.log(response);
            setLoading(false)
            localStorage.setItem("access_token",response.data.token)
            Navigate("/")
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false)

            if(error?.response?.data?.error){
                toast.error('Incorrect username or password',{
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
    <p class="h2 text-primary text-center">Login</p>
     
      <Form.Group className="mb-3" controlId="formBasicusername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" onInput={(e)=> {
            setLogindata(prev => ({...prev,username:e.target.value}))
            }} className='py-2 border-bottom rounded-0 border-0 border-primary' required/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onInput={(e)=> {
            setLogindata(prev => ({...prev,password:e.target.value}))
            }} className='py-2 border-bottom rounded-0 border-0 border-primary' required   />
      </Form.Group>
 
      <Button variant="primary" onClick={LoginHandle}>
        Submit
      </Button>


      <p className='text-center my-3'>Don't  have a account? <a href={`register`}>Register</a></p>
    </Form>
  </div>
  )
}

export default Login