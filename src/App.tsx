import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

type Album = {
  id: number,
  title: string,
  releaseYear: number,
  rating: number,
  artist: {id: number, name: string}
} 

function App() {
  const [data, setData] = useState<Album[]>([])

  useEffect(() => {
    (async () => {
      await axios.get('http://localhost:8080/api/v1/albums')
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log(error)
      })
    })()
  }, [])

  
  if(data) {
    return(
    <>
      {data.map(item => <p key={item.id}>{item.artist.name} - {item.title}</p>)}
    </>
    )
  }  
}

export default App
