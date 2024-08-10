import { ShowModel } from '@/models/ShowModel'
import type { Show } from '@/types/show'
import axios from 'axios'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('axios')

describe('ShowModel', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('fetchShows', () => {
    it('should fetch and return shows data', async () => {
      const mockShows: Show[] = [
        { id: 1, name: 'Show 1', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.0 }, summary: '' },
        { id: 2, name: 'Show 2', genres: ['Drama'], image: { medium: 'http://example.com/image2.jpg', original: 'http://example.com/image4.jpg' }, rating: { average: 7.5 }, summary: '' },
      ]

      vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockShows })

      const shows = await ShowModel.fetchShows()

      expect(shows).toEqual(mockShows)
      expect(axios.get).toHaveBeenCalledWith('https://api.tvmaze.com/shows')
    })

    it('should handle errors when fetching shows', async () => {
      vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Network Error'))

      await expect(ShowModel.fetchShows()).rejects.toThrow('Network Error')
      expect(axios.get).toHaveBeenCalledWith('https://api.tvmaze.com/shows')
    })
  })

  describe('fetchShowById', () => {
    it('should fetch and return a show by id', async () => {
      const mockShow: Show = { id: 1, name: 'Show 1', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.0 }, summary: '' }

      vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockShow })

      const show = await ShowModel.fetchShowById(1)

      expect(show).toEqual(mockShow)
      expect(axios.get).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1')
    })

    it('should handle errors when fetching a show by id', async () => {
      vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Network Error'))

      await expect(ShowModel.fetchShowById(1)).rejects.toThrow('Network Error')
      expect(axios.get).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1')
    })
  })
})