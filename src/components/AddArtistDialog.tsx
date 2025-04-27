import { Artist } from '../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addArtist } from '../services/albumService'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

type AddArtistDialogProps = {
    open: boolean,
    setOpen: (arg? : any) => void
}

const AddArtistDialog = ({ open, setOpen } : AddArtistDialogProps) => {

    const [newArtist, setNewArtist] = useState<Artist>({
        name: ''
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addArtist,
        onError: (err) => {
            toast.error('Error adding artist to a database') 
            console.log(err)
        },
        onSuccess: (data) => {
            toast.success('New artist added', {
                description: `${data.name} successfully added to database`
            })
            queryClient.invalidateQueries({ queryKey : ['artists']})
            console.log('Success: ', data)
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewArtist({
            ...newArtist,
            name: event.target.value
        })
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate(newArtist)
        handleDialogClose()
        setNewArtist({name: ''})
    }

    const handleDialogClose = () => {
        setOpen(false)
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new artist</DialogTitle>
                    <DialogDescription>
                        Add a new artist to the database
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSave} className='flex flex-column gap-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='artist'>Name</Label>
                        <Input id='name' className='col-span-3' onChange={handleChange}></Input>
                        <Button type='submit'>Add</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddArtistDialog