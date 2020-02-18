import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../_services/api.service';
import {ModalDeleteComponent} from "../modal-delete/modal-delete.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../_services/data.service';
import {ActorInterface} from '../_interfaces/actor-interface';

@Component(
{
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class MovieDetailsComponent implements OnInit
{
	movieDetailsForm: FormGroup;
	genreList: string[] = [];
	hasGenres: boolean;
	submitted: boolean = false;
	formStatus: string = "normal";
	actorList: ActorInterface[] = [];

	constructor(private dataService: DataService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private apiService: ApiService){}

	ngOnInit(): void
	{
		let movieID = Number.parseInt(this.route.snapshot.paramMap.get("movieID"));

		if(movieID === undefined || movieID === null)
		{
			this.router.navigate(["**"]);
		}
		else
		{
			this.dataService.currentMessage.subscribe(message =>
			{
				if(message ===  "deleteConfirmed")
				{
					this.deleteMovie();
				}
			});

			this.movieDetailsForm = this.formBuilder.group(
			{
				title: ["", [Validators.required]],
				releaseDate: ["", [Validators.required]],
				genre: ["", [Validators.required]],
				description: ["", [Validators.required]],
				actors: [null, [Validators.required]]
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

			let json3 =
			{
				action: "getActors"
			};

			this.apiService.call(JSON.stringify(json3)).subscribe(response =>
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

			let json2 =
			{
				action: "getMovie",
				movieID: movieID
			};

			this.apiService.call(JSON.stringify(json2)).subscribe(response =>
			{
				if(JSON.parse(JSON.stringify(response)).length === 1)
				{
					this.movieDetailsForm.controls["title"].setValue(response[0].title);
					this.movieDetailsForm.controls["releaseDate"].setValue(response[0].releaseDate);
					this.movieDetailsForm.controls["description"].setValue(response[0].description);
					this.movieDetailsForm.controls["genre"].setValue(response[0].genreID);
				}
				else
				{
					this.hasGenres = false;
				}
			});

			let json4 =
			{
				action: "getActorsInMovie",
				movieID: movieID
			};

			this.apiService.call(JSON.stringify(json4)).subscribe(response =>
			{
				let selectedList: number[] =[];

				for(let index in response)
				{
					selectedList.push(response[index]["actorID"]);
				}

				if(selectedList[0] !== undefined)
				{
					this.movieDetailsForm.controls["actors"].setValue(selectedList);
				}
			});
		}
	}

	submit(formData): void
	{
		this.submitted = true;

		let json = JSON.parse(JSON.stringify(formData));

		json.action = "updateMovie";
		json.movieID = Number.parseInt(this.route.snapshot.paramMap.get("movieID"));

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).success)
			{
				this.updateActorsInMovie(json.movieID, json.actors);

				this.formStatus = "updated";
			}
			else
			{
				this.hasGenres = false;
			}

			this.submitted = false;
		});
	}

	private updateActorsInMovie(movieID: number, actors: number[]): void
	{
		this.deleteAllActorsToMovie(movieID);

		for(let index in actors)
		{
			if(this.hasGenres)
			{
				let json2 =
				{
					action: "addActorToMovie",
					movieID: movieID,
					actorID: actors[index]
				};

				this.apiService.call(JSON.stringify(json2)).subscribe(response =>
				{
					if(!JSON.parse(JSON.stringify(response)).success)
					{
						this.hasGenres = false;
					}
				});
			}
		}
	}

	private deleteAllActorsToMovie(movieID: number): void
	{
		let json =
		{
			action: "deleteAllActorsToMovie",
			movieID: movieID,
		};

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(!JSON.parse(JSON.stringify(response)).success)
			{
				this.hasGenres = false;
			}
		});
	}

	private deleteMovie(): void
	{
		this.deleteAllActorsToMovie(Number.parseInt(this.route.snapshot.paramMap.get("movieID")));

		let json =
		{
			movieID: Number.parseInt(this.route.snapshot.paramMap.get("movieID")),
			action: "deleteMovie"
		};

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).success)
			{
				this.formStatus = "deleted";
			}
			else
			{
				this.hasGenres = false;
			}

			this.submitted = false;
		});
	}

	confirmDelete(): void
	{
		this.modalService.open(ModalDeleteComponent);
	}

	returnHome(): void
	{
		this.router.navigate(["/"]);
	}
}