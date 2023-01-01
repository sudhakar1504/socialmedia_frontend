import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  let Navigate= useNavigate()
  return (
    <nav class="navbar navbar-expand-lg bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href={'/'}>ART Gallery</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      
     
      </ul>
      <form class="d-flex" role="search">
       
        <button class="btn btn-outline-success" onClick={()=>{
         localStorage.setItem("access_token",'');
         Navigate("/login")
        }}>Logout</button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar