import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {ApiService} from '../_services/api.service';
import {MovieInterface} from '../_interfaces/movie-interface';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

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
	movieTableCols: String[] = ["title", "releaseDate", "genreName", "description"];

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
				
				console.info(this.sort);
			}
			else
			{
				this.noMovies = true;
			}
		});
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