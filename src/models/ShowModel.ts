import type { Show } from '@/types/show'
import axios from 'axios'

export class ShowModel {
  static async fetchShows(): Promise<Show[]> {
    const { data } = await axios.get<Show[]>('https://api.tvmaze.com/shows')
    
    return data
  }

  static async fetchShowById(id: number): Promise<Show> {
    const { data } = await axios.get<Show>(`https://api.tvmaze.com/shows/${id}`)
    
    return data
  }
}