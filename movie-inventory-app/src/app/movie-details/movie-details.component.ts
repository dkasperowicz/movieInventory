import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../_services/api.service';
import {ModalDeleteComponent} from "../modal-delete/modal-delete.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../_services/data.service';

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
				description: ["", [Validators.required]]
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
				this.formStatus = "updated";
			}
			else
			{
				this.hasGenres = false;
			}

			this.submitted = false;
		});
	}

	private deleteMovie(): void
	{
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