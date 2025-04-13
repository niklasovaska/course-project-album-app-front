export type AlbumResponse = {
    id: number,
    title: string,
    releaseYear: number,
    rating: number,
    artist: {
        artistId: number,
        name: string
    }
}