import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {ApiService} from '../_services/api.service';
import {MovieInterface} from '../_interfaces/movie-interface';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DataService} from '../_services/data.service';
import {ActorInterface} from '../_interfaces/actor-interface';

@Component(
{
	selector: 'app-list-movies',
	templateUrl: './list-movies.component.html',
	styleUrls: ['./list-movies.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ListMoviesComponent implements OnInit
{
	noMovies: boolean = true;
	movieList = new MatTableDataSource<MovieInterface>();
	movieTableCols: String[] = ["title", "releaseDate", "genreName", "description", "actors"];
	disableAddMovie: boolean = true;

	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@ViewChild(MatSort) set matSort(ms: MatSort)
	{
		this.sort = ms;
		this.setDataSourceAttributes();
	 }

	constructor(private apiService: ApiService, private router: Router){}
		
	ngOnInit(): void
	{
		let json =
		{
			action: "getMovies"
		};

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).length > 0)
			{
				this.noMovies = false;
				
				this.movieList.data = response;

				this.getActorsForMovies();
			}
			else
			{
				this.noMovies = true;
			}
		});

		let json2 =
		{
			action: "getActors"
		};

		this.apiService.call(JSON.stringify(json2)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).length > 0)
			{
				this.disableAddMovie = false;
			}
		})
	}

	private getActorsForMovies(): void
	{
		for(let movie of this.movieList.data)
		{
			let json = 
			{
				action: "getActorsInMovie",
				movieID: movie.movieID
			}

			this.apiService.call(JSON.stringify(json)).subscribe(response =>
			{
				let listOfActors: ActorInterface[] = [];

				for(let index in response)
				{
					let json2 =
					{
						action: "getActor",
						actorID: response[index]["actorID"]
					}

					this.apiService.call(JSON.stringify(json2)).subscribe(response2 =>
					{
						let newActor: ActorInterface = response2[0];

						newActor.actorID = response[index]["actorID"];

						listOfActors.push(newActor);
					})
				}

				movie.actors = listOfActors;
			});
		}
	}

	addMovie(): void
	{
		this.router.navigate(["/addMovie"]);
	}

	private setDataSourceAttributes()
	{
		this.movieList.sort = this.sort;
	}
}