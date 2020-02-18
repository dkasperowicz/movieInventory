import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../_services/api.service';

@Component(
{
	selector: 'app-add-actor',
	templateUrl: './add-actor.component.html',
	styleUrls: ['./add-actor.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AddActorComponent implements OnInit
{
	addActorForm: FormGroup;
	noError: boolean = true;
	submitted: boolean = false;
	addActor: boolean = true;

	constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder){}
	
	ngOnInit(): void
	{
		this.addActorForm = this.formBuilder.group(
		{
			givenName: ["", [Validators.required]],
			surname: ["", [Validators.required]]
		});
	}

	submit(formData): void
	{
		this.submitted = true;

		let json = JSON.parse(JSON.stringify(formData));

		json.action = "setActor";

		this.apiService.call(JSON.stringify(json)).subscribe(response =>
		{
			if(JSON.parse(JSON.stringify(response)).success)
			{
				this.addActor = false;
			}
			else
			{
				this.noError = false;
			}

			this.submitted = false;
		});
	}

	returnHome(): void
	{
		this.router.navigate(["/"]);
	}
}