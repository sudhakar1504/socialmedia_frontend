import React, { useEffect } from 'react';
import { useState } from 'react';
import './Createpost.css';
import axios from 'axios';
import {toast } from 'react-toastify';
import Spin from '../../images/spin.gif'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const Createpost = () => {
  let { id } = useParams();
  const [Loading, setLoading] = useState(false)

  const Navigate = useNavigate();

  const [Postdata, setPostdata] = useState({
    title:'',
    desc:"",
    file:''
  })

  function UploadHandle(){
    if(Postdata.title =="" || Postdata?.desc == ""||Postdata?.file == ""){
      toast.error('Fill the fields',{
          position: toast.POSITION.TOP_CENTER
      })
      toast.clearWaitingQueue();
      return;
  }
  var formdata = new FormData();
  if(Postdata?.file?.name){

    formdata.append("image",  Postdata?.file , Postdata?.file?.name);
  }
formdata.append("title", Postdata.title);
formdata.append("desc", Postdata?.desc);
formdata.append("post_id", id);

var requestOptions = {
  method: 'POST',
  
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("access_token")
    },
  body: formdata,
  redirect: 'follow'
};
setLoading(true)
fetch(`https://social-media-be.onrender.com/api/post/${id == 'new' ? 'create' : 'edit_post'}`, requestOptions)
  .then(response => response.text())
  .then(result => {
setLoading(false)

    Navigate('/');
  })
  .catch(error => {
    console.log(error);
setLoading(false)

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
              file:data?.url
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
    <div className='d-flex align-item-center justify-content-center pt-5' >
      <Navbar />
        {Loading && <div className="loading_screen">
        <img src={Spin} alt="" />
      </div>}
      <div className='d-flex align-item-center justify-content-center flex-column w-100 p-2' style={{maxWidth:'540px',minWidth:'250px'}}>
        <h2>Upload post</h2>
      <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Title</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" value={Postdata?.title} placeholder="Add title" onChange={(e)=>{
    setPostdata(prev=>({...prev,title:e.target.value}))
  }}/>
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={Postdata?.desc} onChange={(e)=>{
    setPostdata(prev=> ({...prev,desc:e.target.value}))
  }}></textarea>
</div>
<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={Postdata.file?.name ? URL.createObjectURL(Postdata.file) : Postdata.file} class="d-block w-30" alt="" style={{maxWidth:'200px',maxHeight:'200px'}}/>
    </div>
   
  </div>
</div>
<div class="mb-3">
  <label for="formFile" class="form-label">Add image</label>
  <input class="form-control" type="file" id="formFile" onChange={(e)=>{
    setPostdata(prev=>({...prev,file:e.target.files[0]}))
  }}
  accept=".png,.jpg,.jpeg"
  />
</div>
<button type="button" class="btn btn-primary" onClick={UploadHandle}>Upload post</button>
      </div>
    </div>
  )
}

export default Createpost;