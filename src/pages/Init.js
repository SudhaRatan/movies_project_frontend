import axios from "axios";
import { Spinner } from "react-bootstrap";
import { API } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Init = () => {
  const navigate = useNavigate()
  const connect = () => {
    axios
      .get(`${API}/init`)
      .then(res => {
        if(res.data.auth){
          navigate('/home')
        }
      })
      .catch(err => {
        connect()
      })
  }

  useEffect(() => {
    connect()
  },[])

  return(
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:"center",
      flexDirection:"column"
    }}>
      <Spinner />
      <div>Connecting to server</div>
    </div>
  )
}

export default Init;