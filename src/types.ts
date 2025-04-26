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

export type AlbumEntry = {
    title: string,
    releaseYear: number,
    rating: number,
    artist: String
}

export type ArtistResponse = {
    name: String,
    _links: {
        self: {
            href: string
        },
        artist: {
            href: string
        },
        albums: {
            href: string
        }
    }
}

export type Artist = {
    name: string
}