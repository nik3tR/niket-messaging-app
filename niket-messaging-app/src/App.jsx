import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5174")
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])

  return (
    <div className='App'>
      <input placeholder="Message" 
        onChange={(event) => {
        setMessage(event.target.value)
      }}></input>
      <button onClick={sendMessage}>Send</button>
      <h1>Message: </h1>
      {messageReceived}
    </div>
  )
}

export default App
