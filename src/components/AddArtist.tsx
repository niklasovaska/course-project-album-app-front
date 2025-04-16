import { Artist } from '../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addArtist } from '../services/albumService'
import { useState } from "react"


const AddArtist = () => {

    const [newArtist, setNewArtist] = useState<Artist>({
        name: ''
    })


    const { mutate } = useMutation({
        mutationFn: addArtist,
        onError: (err) => { 
            console.log(err)
        },
        onSuccess: (data) => {
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
        setNewArtist({name: ''})
    }

    return(
        <form onSubmit={handleSave} style={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <div style={{display: 'flex', gap: 50}}>
                <label htmlFor='artist'></label>
                <input name='artist' id='artist' onChange={handleChange}/>
                <button type='submit'>Save</button>
            </div>
        </form>
    )
}

export default AddArtist