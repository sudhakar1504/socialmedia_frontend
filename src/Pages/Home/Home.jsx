import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Spin from '../../images/spin.gif'
import './Home.css';

const Home = () => {
  const [Postlist, setPostlist] = useState([]);
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate()

function GetPost(){
  setLoading(true)

  axios.get('https://social-media-be.onrender.com/api/post/posts',{
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("access_token")
    }})
  .then(function (response) {
    console.log(response);
  setLoading(false)

    setPostlist(response?.data?.data);
  })
  .catch(function (error) {
    console.log(error);
  setLoading(false)

   navigate('/login')
  });
}
function DeletePost(id){
  setLoading(true)
  axios.post('https://social-media-be.onrender.com/api/post/delete',{post_id:id},{
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("access_token")
    }})
  .then(function (response) {
    console.log(response);
    setLoading(false)

    GetPost()
  })
  .catch(function (error) {
  setLoading(false)
    console.log(error);
   
  });
}
useEffect(() => {
  GetPost();
}, [])

  return (
    <div className='post_list_container pt-5 mt-3'>

      {Loading && <div className="loading_screen">
        <img src={Spin} alt="" />
      </div>}

        <Navbar/>
        <div className='text-center create_post_btn'>
          <a  href={'create/new'}>Create post</a>
        </div>
      <div className='d-flex flex-wrap p-3'>
        {Postlist?.map((item,index)=>{
          return   <div class="card m-3" style={{width:'540px'}} key={index}>
          <div class="row g-0 m-2 ">
        <div class="col-md-6" onClick={()=>{
          navigate(`viewpost/${item?.id}`)
        }}>
          <img src={item?.url} style={{height:'250px',border:'1px solid red',width:'250px',cursor:'pointer'}} class="img-fluid rounded-start" alt="..." />

          {item?.is_edit && <div className='my-2 action_btn_container'>
          <button className='text-primary' onClick={()=>{
navigate(`create/${item?.id}`)
          }}><i class="fa-solid fa-pen"></i></button>
          <button className='text-danger' onClick={()=>{
            DeletePost(item?.id)
          }}><i class="fa-solid fa-trash"></i></button>
          </div>}
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title">{item?.title}</h5>
            <p class="card-text " style={{height:'180px',overflowY:'auto',fontSize:'12px'}}>{item?.desc}</p>
            <p class="card-text"><small class="text-muted">Last updated {item?.date?.split('T')[1]?.split('.')[0]} {item?.date?.split('T')[0]}</small></p>
          </div>
        </div>
      </div>
          </div>
        })}
      
      
</div>
    </div>
  )
}

export default Home