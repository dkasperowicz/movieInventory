export interface MovieInterface
{
	movieID: number,
	title: string,
	releaseDate: Date,
	description: string,
	genreID?: number,
	genreName?: string
}