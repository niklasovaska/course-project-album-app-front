import { AlbumResponse } from '../types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const Albumlist = () => {
    const getAlbums = async (): Promise<AlbumResponse[]> => {
        const response = await axios.get('http://localhost:8080/api/v1/albums')

        return response.data
    }

    const { data, error, isSuccess } = useQuery({
        queryKey: ['albums'],
        queryFn: getAlbums
    })

    if(!isSuccess) {
        return <span>Loading...</span>
    }
    else if(error) {
        return(<span>Error when fetching albums...</span>)
    }
    else {
        return(
            <table>
                <tbody>
                    {data.map((album: AlbumResponse) => 
                    <tr key={album.id}>
                        <td>{album.title}</td>
                        <td>{album.artist.name}</td>
                        <td>{album.releaseYear}</td>
                        <td>{album.rating}</td>
                    </tr>)
                    }
                </tbody>
            </table>
        )
    }
}

export default Albumlist