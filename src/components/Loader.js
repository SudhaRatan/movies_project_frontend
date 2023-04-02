import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      justifyContent:"center",
      alignItems:"center"
    }}>
      <Spinner />
    </div>
  )
}

export default Loading