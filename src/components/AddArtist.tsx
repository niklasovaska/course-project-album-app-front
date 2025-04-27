import { useState } from "react"
import { Button } from "./ui/button"
import AddArtistDialog from './AddArtistDialog'
import { Plus } from 'lucide-react'

const AddArtist = () => {
    let [open, setOpen] = useState(false)

    return(
        <>
            <Button variant='secondary' onClick={() => setOpen(true)}>
                <Plus className="mr-1" />
                Add artist
            </Button>
            <AddArtistDialog open={open} setOpen={setOpen}/>
        </>
    )
}

export default AddArtist