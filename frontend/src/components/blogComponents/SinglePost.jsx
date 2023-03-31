import { Heading } from "@chakra-ui/react";
import { Container } from "chakra-paginator";
import { useState,useEffect } from "react"
import { useLocation } from "react-router-dom";


export default function SinglePost() {
    const location = useLocation();
    const [postDtaId,setPostData] =useState({});
    const [postData,setCurrentPost] =useState(null);


const fetchCurrentPost=async(id)=>{
    const res = await fetch(
        `http://localhost//getCurrentTopic?id=${id}`,

      );

}    
    useEffect(()=>{
setPostData(location.state);
//get data from backend

fetchCurrentPost(location.state).theme(item)=>{
    setCurrentPost(item)
};setTimeout(()=>{
    if(location.state==null){
        window.location.href='/404';
    }
},100)
    },[location.state]);
    return (
        <>
          {postData != null ? (
            <Container maxW="1200px" marginTop={"50px"}>
              <Heading size={"lg"} textAlign="center" color={"gra"}>
                {postData.title}
              </Heading>
              <img src={postData.image} width="300px" height={"100px"} />
              <br />
              <hr />
              <br />
              <p>{postData.content}</p>
            </Container>
          ) : null}
        </>
      );
      
}
