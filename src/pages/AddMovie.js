import axios from "axios"
import { API } from "../App"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const AddMovie = () => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  const navigate = useNavigate()

  const verify = () => {
    if (localStorage.getItem('token')) {
    } else {
      navigate('/login', {
        state: {
          message: "Login to continue"
        }
      })
    }
}

useEffect(() => {
  verify()
}, [])

return (
  <div>Add movie page</div>
)
}

export default AddMovie