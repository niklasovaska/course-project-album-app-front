import { useState } from "react"
import { Button } from "./ui/button"
import AddAlbumDialog from "./AddAlbumDialog"
import { Plus } from 'lucide-react'

const AddAlbum = () => {

    let [open, setOpen] = useState(false)
    
        return(
           <>
                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-1" />
                    Add album
                </Button>
                <AddAlbumDialog open={open} setOpen={setOpen} />
           </>
        )
}

export default AddAlbum