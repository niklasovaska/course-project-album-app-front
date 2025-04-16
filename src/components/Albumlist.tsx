import { getAlbums, deleteAlbum } from '../services/albumService'
import { AlbumResponse } from '../types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AddArtist from './AddArtist'

const Albumlist = () => {
  
    const queryClient = useQueryClient()

    const { data, error, isSuccess } = useQuery({
        queryKey: ['albums'],
        queryFn: getAlbums
    })

    const { mutate } = useMutation({
        mutationFn: deleteAlbum,
        onError: (err) => {
            console.log(err)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['albums']})
            console.log('Successfully deleted: ', data)
        }
    })

    if(!isSuccess) {
        return <span>Loading...</span>
    }
    else if(error) {
        return(<span>Error when fetching albums...</span>)
    }
    else {
        return(
            <>
                <table>
                    <tbody>
                        {data.map((album: AlbumResponse) => 
                        <tr key={album.id}>
                            <td>{album.title}</td>
                            <td>{album.artist.name}</td>
                            <td>{album.releaseYear}</td>
                            <td>{album.rating}</td>
                            <td><button onClick={() => mutate(album.id)}>Delete</button></td>
                        </tr>)
                        }
                    </tbody>
                </table>
                <AddArtist />
            </>
            
        )
    }
}

export default Albumlist