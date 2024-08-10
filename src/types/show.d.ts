export interface Show {
  id: number
  name: string
  genres: string[]
  rating: { average: number }
  image: { original: string, medium: string }
  summary: string;
}