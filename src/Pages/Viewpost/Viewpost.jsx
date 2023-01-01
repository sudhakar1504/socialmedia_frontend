import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Spin from '../../images/spin.gif'

import './Viewpost.css';

const Viewpost = () => {
    const {id} = useParams();
  const navigate = useNavigate()
    const [Postdata, setPostdata] = useState({
        title:'',
        desc:"",
        file:'',
        date:"",
        is_edit:'',
        id:''

      })
  const [Loading, setLoading] = useState(false)

      function DeletePost(id){
        setLoading(true)
        axios.post('https://social-media-be.onrender.com/api/post/delete',{post_id:id},{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("access_token")
          }})
        .then(function (response) {
          console.log(response);
        setLoading(false)

          navigate('/');
        })
        .catch(function (error) {
        setLoading(false)

          console.log(error);
         
        });
      }
    const GetpostData=()=>{
      setLoading(true)

        axios.post('https://social-media-be.onrender.com/api/post/getpost', {
          post_id:id
        },{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("access_token")
          }
        })
                .then(function (response) {
                  console.log(response);
        setLoading(false)

                  let data = response.data.data[0];
               setPostdata({
                    title:data?.title,
                    desc:data?.desc,
                    file:data?.url,
                    date:data?.date,
                    is_edit:data?.is_edit
                  })
                })
                .catch(function (error) {
        setLoading(false)

                  console.log(error);
                 
                });
      }

      useEffect(() => {
        if(id !='new'){
         GetpostData();
        }
       }, [])
  return (
    <div className='d-flex align-item-center justify-content-center pt-5'>
      <Navbar />
         {Loading && <div className="loading_screen">
        <img src={Spin} alt="" />
      </div>}
        <div class="card mb-3 " style={{maxWidth:'600px'}}>
  <img src={Postdata?.file} class="card-img-top" alt="..." style={{maxWidth:'600px',height:'auto'}} />
  <div class="card-body">
  {Postdata?.is_edit && <div className='my-2 action_btn_container'>
          <button className='text-primary' onClick={()=>{
navigate(`/create/${id}`)
          }}><i class="fa-solid fa-pen"></i></button>
          <button className='text-danger' onClick={()=>{
            DeletePost(id)
          }}><i class="fa-solid fa-trash"></i></button>
          </div>}
    <h5 class="card-title">{Postdata?.title}</h5>
    <p class="card-text">{Postdata?.desc}</p>
    <p class="card-text"><small class="text-muted">Last updated {Postdata?.date?.split('T')[1]?.split('.')[0]} {Postdata?.date?.split('T')[0]}</small></p>
  </div>
</div>
    </div>
  )
}

export default Viewpost