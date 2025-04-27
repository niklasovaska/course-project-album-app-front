import { getAlbums, deleteAlbum } from '../services/albumService'
import { AlbumResponse } from '../types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "../components/ui/button"
  import { Trash2 } from 'lucide-react'
  import AddArtist from './AddArtist'
  import AddAlbum from './AddAlbum'
  import { LogOut } from 'lucide-react'
  import { toast } from "sonner"

  type AlbumlistProps = {
    logOut?: () => void
}

const Albumlist = ({ logOut } : AlbumlistProps) => {

    const queryClient = useQueryClient()

    const { data, error, isSuccess } = useQuery({
        queryKey: ['albums'],
        queryFn: getAlbums
    })

    const { mutate } = useMutation({
        mutationFn: deleteAlbum,
        onError: (err) => {
            toast.error('Error deleting album')
            console.log(err)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['albums']})
            toast.success('Album successfully deleted')
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
            <div className='flex flex-col gap-10 w-full px-5'>
                <div className='flex items-center justify-between'>
                    <AddAlbum />
                    <AddArtist />
                    <Button onClick={logOut} variant='outline'>
                        <LogOut />
                        Log out
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Album collection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead className='text-center'>Artist</TableHead>
                                    <TableHead className='text-center'>Release year</TableHead>
                                    <TableHead className='text-center'>Rating</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((album: AlbumResponse) => 
                                <TableRow key={album.id}>
                                    <TableCell>{album.title}</TableCell>
                                    <TableCell className='text-center'>{album.artist.name}</TableCell>
                                    <TableCell className='text-center'>{album.releaseYear}</TableCell>
                                    <TableCell className='text-center'>{album.rating}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant='outline' 
                                            size='icon' 
                                            onClick={() => mutate(album.id)}><Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table> 
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Albumlist