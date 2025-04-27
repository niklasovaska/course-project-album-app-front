import { AlbumResponse, AlbumEntry, Artist, ArtistResponse } from '../types'
import axios, { AxiosRequestConfig } from 'axios'

const baseUrl = 'http://packtalbum-env.eba-umvkcsxp.eu-north-1.elasticbeanstalk.com/api'

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem('jwt')

    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    }
}

export const getAlbums = async (): Promise<AlbumResponse[]> => {
    const response = await axios.get(`${baseUrl}/v1/albums`, getAxiosConfig())

    return response.data
}

export const deleteAlbum = async (id: number): Promise<AlbumResponse> => {
    const response = await axios.delete(`${baseUrl}/albums/${id}`, getAxiosConfig())

    return response.data
}

export const addAlbum = async (album: AlbumEntry): Promise<AlbumEntry> => {
    const response = await axios.post(`${baseUrl}/albums`, album, getAxiosConfig())

    return response.data
}

// const updateAlbum = async (albumEntry: AlbumEntry): Promise<AlbumResponse> => {
//     const response = await axios.put(albumEntry.url, albumEntry.album, getAxiosConfig())
// }

export const getArtists = async (): Promise<ArtistResponse[]> => {
    const response = await axios.get(`${baseUrl}/artists`, getAxiosConfig())

    return response.data._embedded.artists
}

export const addArtist = async (artist: Artist): Promise<ArtistResponse> => {
    const response = await axios.post(`${baseUrl}/artists`, artist, getAxiosConfig())
        
    return response.data
}




