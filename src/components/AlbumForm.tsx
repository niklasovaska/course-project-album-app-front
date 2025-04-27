import { ArtistResponse } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "@/components/ui/select"
import { 
        Card, 
        CardContent,
        CardFooter 
} from "../components/ui/card"

type AlbumFormProps = {
    data: Array<ArtistResponse>,
    handleSave: React.FormEventHandler<HTMLFormElement>,
    handleChange: React.ChangeEventHandler<HTMLInputElement>,
    handleArtistSelectChange: (value: string) => void
}

const AlbumForm = ({ data, handleSave, handleChange, handleArtistSelectChange } : AlbumFormProps) => {
    return(
        <form onSubmit={handleSave} className='flex flex-col items-center w-full'>
            <Card className='w-full max-w-sm'>
                <CardContent className='grid gap-4'>
                    <div className='grid gap-2'>
                        <Label>Artist</Label>
                        <Select onValueChange={handleArtistSelectChange}>
                            <SelectTrigger>
                                <SelectValue placeholder='Select an artist'/>
                            </SelectTrigger>
                            <SelectContent>
                                {data.map((artist: ArtistResponse) =>
                                    <SelectItem
                                        key={artist._links.self.href}
                                        value={artist._links.self.href}
                                        >{artist.name}</SelectItem>
                                )}  
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='title'>Album title</Label>
                        <Input name='title' id='title' type='text' onChange={handleChange} required />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='releaseYear'>Release year</Label>
                        <Input
                            type='number'
                            min='0'
                            name='releaseYear' 
                            id='releaseYear' onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='rating'>Rating</Label>
                        <Input
                            type='number'
                            min='0'
                            max='5'
                            step='0.5'
                            name='rating' 
                            id='rating' onChange={handleChange}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type='submit' className='w-full'>Add</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default AlbumForm