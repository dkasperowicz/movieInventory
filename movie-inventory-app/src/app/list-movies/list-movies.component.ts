import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ApiService} from '../_services/api.service';
import {MovieInterface} from '../_interfaces/movie-interface';
import {Router} from '@angular/router';

@Component(
{
	selector: 'app-list-movies',
	templateUrl: './list-movies.component.html',
	styleUrls: ['./list-movies.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ListMoviesComponent implements OnInit
{
	movieList: MovieInterface[] = [];
	hasMovies: boolean;

	constructor(private apiService: ApiService, private router: Router){}
	
	ngOnInit(): void
	{
		let json =
		{
			action: "getMovies"
		}

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).length > 0)
			{
				this.hasMovies = true;
			}
			else
			{
				this.hasMovies = false;
			}
		});
	}

	addMovie(): void
	{
		this.router.navigate(["/addMovie"]);
	}
}