import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {ActorInterface} from '../_interfaces/actor-interface';

@Component(
{
	selector: 'app-add-movie',
	templateUrl: './add-movie.component.html',
	styleUrls: ['./add-movie.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class AddMovieComponent implements OnInit
{
	genreList: string[] = [];
	actorList: ActorInterface[] = [];
	addMovieForm: FormGroup;
	hasGenres: boolean = true;
	submitted: boolean = false;
	addMovie: boolean = true;

	constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder){}
	
	ngOnInit(): void
	{
		this.addMovieForm = this.formBuilder.group(
		{
			title: ["", [Validators.required]],
			releaseDate: ["", [Validators.required]],
			genre: ["", [Validators.required]],
			description: ["", [Validators.required]],
			actors: ["", [Validators.required]]
		});

		let json =
		{
			action: "getGenres"
		};

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).length > 0)
			{
				this.hasGenres = true;
				this.genreList = JSON.parse(JSON.stringify(response));
			}
			else
			{
				this.hasGenres = false;
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
				this.actorList = JSON.parse(JSON.stringify(response));
			}
			else
			{
				this.hasGenres = false;
			}
		});
	}

	submit(formData): void
	{
		this.submitted = true;

		let json = JSON.parse(JSON.stringify(formData));

		json.action = "setMovie";

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).success)
			{
				this.addActorsToMovie(JSON.parse(JSON.stringify(response)).movieID[0][0], formData.actors);
			}
			else
			{
				this.hasGenres = false;
			}

			this.submitted = false;
		});
	}

	private addActorsToMovie(movieID: number, actors: number[]): void
	{
		let successfullyEnteredActorToMovie: boolean = true;

		for(let index in actors)
		{
			if(successfullyEnteredActorToMovie)
			{
				let json =
				{
					action: "addActorToMovie",
					movieID: movieID,
					actorID: actors[index]
				};

				this.apiService.call(JSON.stringify(json)).subscribe(response =>
				{
					if(JSON.parse(JSON.stringify(response)).success)
					{
						successfullyEnteredActorToMovie = true;
					}
					else
					{
						successfullyEnteredActorToMovie = false;
					}
				});
			}

			if(successfullyEnteredActorToMovie)
			{
				this.addMovie = false;
			}
			else
			{
				this.deleteActorToMovie(movieID, actors);
				this.deleteMovie(movieID);
				this.hasGenres = false;
			}
		}

		this.addMovie = false;
	}

	private deleteActorToMovie(movieID: number, actors: number[]): void
	{
		for(let index in actors)
		{
			let json =
			{
				action: "deleteActorToMovie",
				movieID: movieID,
				actorID: actors[index]
			}

			this.apiService.call(JSON.stringify(json)).subscribe(response =>
			{
				if(JSON.parse(JSON.stringify(response)).success)
				{
					console.info("Successfully deleted movie and actor association")
				}
				else
				{
					console.error("Failed to delete movie and actor association");
				}
			});
		}		
	}

	private deleteMovie(movieID: number): void
	{
		let json =
		{
			movieID: movieID,
			action: "deleteMovie"
		};

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).success)
			{
				console.info("Successfully deleted movie");
			}
			else
			{
				console.error("Failed to delete movie");
			}
		});
	}

	returnHome(): void
	{
		this.router.navigate(["/"]);
	}
}