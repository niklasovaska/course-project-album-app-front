import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { getArtists, addAlbum } from "../services/albumService"
import { AlbumEntry } from '../types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AlbumForm from './AlbumForm'
import { toast } from "sonner"

type AddAlbumDialogProps = {
    open: boolean,
    setOpen: (arg? : any) => void
}

const AddAlbumDialog = ({ open, setOpen } : AddAlbumDialogProps) => {

    const queryClient = useQueryClient()

    const { data, error, isSuccess } = useQuery({
        queryKey: ['artists'],
        queryFn: getArtists
    })

    const { mutate } = useMutation({
        mutationFn: addAlbum,
        onError: (err) => {
            toast.error('Error adding album to database') 
            console.log(err)
        },
        onSuccess: (data) => {
            toast.success('New album added', {
                description: 'A new album successfully added to database'
            })
            queryClient.invalidateQueries({ queryKey: ['albums']})
            console.log('Success: ', data)
        }
    })

    const [newAlbum, setNewAlbum] = useState<AlbumEntry>({
        title: '',
        releaseYear: 0,
        rating: 0,
        artist: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAlbum({
            ...newAlbum,
            [e.target.name] : e.target.value
        })
    }

    const handleArtistSelectChange = (value: string) => {
        setNewAlbum({
            ...newAlbum,
            artist: value
        })
    }

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(newAlbum)
        setNewAlbum({title: '', releaseYear: 0, rating: 0, artist: ''})
        setOpen(false)
    }

    if(!isSuccess) {
        return <span>Loading...</span>
    }
    else if(error) {
        return(<span>Error when fetching artists...</span>)
    }
    else {

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='flex flex-col justify-center items-center'>
                <DialogHeader className='flex flex-col items-center'>
                    <DialogTitle>Add new album to the collection</DialogTitle>
                    <DialogDescription>
                        Add a new album to the collection. Click add when you're done.
                    </DialogDescription>
                </DialogHeader>
                <AlbumForm 
                    data={data} 
                    handleSave={handleSave} 
                    handleChange={handleChange}
                    handleArtistSelectChange={handleArtistSelectChange} />
            </DialogContent>
        </Dialog>
    )
    }
}

export default AddAlbumDialog