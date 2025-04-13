import { AlbumResponse } from '../types'
import axios, { AxiosRequestConfig } from 'axios'

const baseUrl = 'http://localhost:8080/api'

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

// delete
// add
// update
