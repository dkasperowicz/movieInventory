import {ActorInterface} from './actor-interface';

export interface MovieInterface
{
	movieID: number,
	title: string,
	releaseDate: Date,
	description: string,
	genreID?: number,
	genreName?: string,
	actors?: ActorInterface[]
}