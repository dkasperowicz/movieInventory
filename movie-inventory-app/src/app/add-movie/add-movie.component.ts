import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

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
	addMovieForm: FormGroup;
	hasGenres: boolean = true;
	submitted: boolean = false;
	addMovie: boolean = true;

	constructor(private apiService: ApiService, private formBuilder: FormBuilder){}
	
	ngOnInit(): void
	{

		this.addMovieForm = this.formBuilder.group(
		{
			title: ["", [Validators.required]],
			releaseDate: ["", [Validators.required]],
			genre: ["", [Validators.required]],
			description: ["", [Validators.required]]
		});

		let json =
		{
			action: "getGenres"
		}

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
				this.addMovie = false;
			}
			else
			{

			}

			this.submitted = false;
		});
	}
}